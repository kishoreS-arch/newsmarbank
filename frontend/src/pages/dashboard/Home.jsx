import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Plus, Send, History, ArrowUpRight, 
    ArrowDownLeft, CreditCard, PieChart, Bell, Zap,
    Eye, EyeOff, QrCode, X, Key
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/home.css";

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showBalance, setShowBalance] = useState(false);
    const [balance, setBalance] = useState(124500.50);
    const [showMpinModal, setShowMpinModal] = useState(false);
    const [enteredMpin, setEnteredMpin] = useState("");
    const [attempts, setAttempts] = useState(3);
    const [isLocked, setIsLocked] = useState(false);

    const quickActions = [
        { icon: <Send />, label: "Send", path: "/transfer", color: "#6366f1" },
        { icon: <Zap />, label: "Pay", path: "/scan", color: "#f59e0b" },
        { icon: <Plus />, label: "Add", path: "/deposit", color: "#10b981" },
        { icon: <History />, label: "History", path: "/transactions", color: "#8b5cf6" },
    ];

    const recentTransactions = [
        { id: 1, name: "Amazon India", date: "Today, 2:30 PM", amount: -1240.00, icon: <ArrowUpRight /> },
        { id: 2, name: "Salary Credit", date: "Yesterday", amount: 75000.00, icon: <ArrowDownLeft /> },
        { id: 3, name: "Starbucks Coffee", date: "28 Mar 2024", amount: -450.00, icon: <ArrowUpRight /> },
    ];

    const handleVerifyMpin = async () => {
        if (isLocked) {
            alert("Account balance view is locked due to too many failed attempts. Please relogin to reset.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-mpin', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({ mpin: enteredMpin }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setShowBalance(true);
                setShowMpinModal(false);
                setBalance(data.balance);
                setEnteredMpin("");
                setAttempts(3); // Reset on success
            } else {
                const newAttempts = attempts - 1;
                setAttempts(newAttempts);
                setEnteredMpin("");
                
                if (newAttempts <= 0) {
                    setIsLocked(true);
                    alert("Incorrect MPIN. Too many failed attempts. Feature locked.");
                } else {
                    alert(`Incorrect MPIN. ${newAttempts} attempts remaining.`);
                }
            }
        } catch (error) {
            console.error("Verification failed:", error);
            // Fallback for demo just in case backend is offline
            if (enteredMpin === "1234") {
                setShowBalance(true);
                setShowMpinModal(false);
                setEnteredMpin("");
                setAttempts(3);
            } else {
                const newAttempts = attempts - 1;
                setAttempts(newAttempts);
                setEnteredMpin("");
                if (newAttempts <= 0) {
                    setIsLocked(true);
                    alert("Database Error / Offline. Too many failed attempts. Feature locked.");
                } else {
                    alert(`Incorrect MPIN (Offline Demo). ${newAttempts} attempts remaining.`);
                }
            }
        }
    };

    return (
        <div className="home-container">
            {/* Header / Greeting */}
            <header className="home-header">
                <div className="greeting">
                    <span>Welcome back,</span>
                    <h2>{user?.displayName || "Kishore S"}</h2>
                    <span className="user-email">{user?.email || "kishore@example.com"}</span>
                </div>
                <div className="header-actions">
                    <div className="qr-trigger" onClick={() => navigate("/scan")}>
                         <QrCode size={24} />
                    </div>
                    <div className="notif-badge">
                        <Bell size={22} />
                        <div className="dot"></div>
                    </div>
                </div>
            </header>

            {/* Balance Card */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="balance-card"
            >
                <div className="card-top">
                    <div className="brand">SmartBank Premium</div>
                    <CreditCard size={24} />
                </div>
                <div className="balance-row">
                    <div className="balance-info">
                       <div className="label">Available Balance</div>
                       <div className="amount-row">
                           <div className="amount">
                               {showBalance ? `₹ ${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : "XXXXXX.XX"}
                           </div>
                           <button 
                                className="eye-toggle" 
                                onClick={() => showBalance ? setShowBalance(false) : setShowMpinModal(true)}
                           >
                               {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                           </button>
                       </div>
                    </div>
                    <div className="personal-qr">
                         <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=pay:${user?.phone || '9999999999'}`} 
                            alt="Your QR" 
                         />
                    </div>
                </div>
                <div className="card-bottom">
                    <div className="card-number">**** **** **** {user?.phone?.slice(-4) || "4242"}</div>
                    <div className="card-exp">08/28</div>
                </div>
            </motion.div>

            {/* MPIN Modal Overlay */}
            <AnimatePresence>
                {showMpinModal && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="mpin-modal glass-card"
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            exit={{ y: 50 }}
                        >
                            <button className="close-btn" onClick={() => setShowMpinModal(false)}>
                                <X size={20} />
                            </button>
                             <Key className="modal-icon" size={32} />
                             <h3>Verify Identity</h3>
                             <p>Enter your 4-digit MPIN to view balance</p>
                             
                             <div className={`mpin-input-wrapper ${isLocked ? 'locked' : ''}`}>
                                 <input 
                                     type="password" 
                                     maxLength={4}
                                     className="modal-mpin-input"
                                     placeholder="...."
                                     value={enteredMpin}
                                     onChange={(e) => setEnteredMpin(e.target.value.replace(/\D/g, ''))}
                                     autoFocus
                                     disabled={isLocked}
                                 />
                             </div>

                             <div className="attempts-badge">
                                 {isLocked 
                                     ? <span style={{color: 'red'}}>Feature Locked</span> 
                                     : <span>Attempts Left: <b>{attempts}</b></span>}
                             </div>
                             
                             <button 
                                 className="btn-primary full-width"
                                 disabled={isLocked || enteredMpin.length < 4}
                                 onClick={handleVerifyMpin}
                             >
                                 {isLocked ? "LOCKED" : "Verify & Show"}
                             </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Actions */}
            <section className="section">
                <div className="section-header">
                    <h3>Quick Actions</h3>
                </div>
                <div className="actions-grid">
                    {quickActions.map((action, i) => (
                        <motion.div 
                            key={i}
                            whileTap={{ scale: 0.95 }}
                            className="action-item"
                            onClick={() => navigate(action.path)}
                        >
                            <div className="action-icon" style={{ background: action.color }}>
                                {action.icon}
                            </div>
                            <span>{action.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Insights Row */}
            <div className="insights-row">
                 <div className="insight-card glass-card">
                     <PieChart size={20} className="insight-icon" />
                     <div className="insight-data">
                         <div className="label">Monthly Spend</div>
                         <div className="val">₹ 42,000</div>
                     </div>
                 </div>
                 <div className="insight-card glass-card">
                     <Zap size={20} className="insight-icon yellow" />
                     <div className="insight-data">
                         <div className="label">Reward Pts</div>
                         <div className="val">2,450</div>
                     </div>
                 </div>
            </div>

            {/* Transactions Section */}
            <section className="section">
                <div className="section-header">
                    <h3>Recent Transactions</h3>
                    <button onClick={() => navigate("/transactions")}>See All</button>
                </div>
                <div className="transactions-list">
                    {recentTransactions.map((tx) => (
                        <div key={tx.id} className="tx-item glass-card">
                            <div className={`tx-icon ${tx.amount > 0 ? 'credit' : 'debit'}`}>
                                {tx.icon}
                            </div>
                            <div className="tx-info">
                                <div className="tx-name">{tx.name}</div>
                                <div className="tx-date">{tx.date}</div>
                            </div>
                            <div className={`tx-amount ${tx.amount > 0 ? 'credit' : 'debit'}`}>
                                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
