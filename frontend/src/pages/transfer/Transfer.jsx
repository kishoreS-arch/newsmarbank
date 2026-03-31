import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Building2, Phone, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import "../../styles/transfer.css";

const Transfer = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Method, 2: Details, 3: PIN, 4: Success
    const [method, setMethod] = useState(null);
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [pin, setPin] = useState("");

    const transferMethods = [
        { id: "upi", title: "UPI ID", icon: <Phone />, color: "#10b981", desc: "Instant transfer via UPI ID" },
        { id: "bank", title: "Bank Account", icon: <Building2 />, color: "#6366f1", desc: "NEFT / RTGS transfer" },
        { id: "contact", title: "Contact", icon: <Users />, color: "#f59e0b", desc: "Send to phone contacts" },
    ];

    const handleMethodSelect = (m) => {
        setMethod(m);
        setStep(2);
    };

    const handleProceed = (e) => {
        e.preventDefault();
        if (amount && recipient) setStep(3);
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin.length === 4) setStep(4);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="transfer-container"
        >
            <div className="page-header-row">
                <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="page-title mb-0">Send Money</h2>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h3 className="section-title">Select Transfer Method</h3>
                        <div className="method-grid">
                            {transferMethods.map(m => (
                                <div key={m.id} className="method-card glass-card" onClick={() => handleMethodSelect(m)}>
                                    <div className="method-icon-wrap" style={{ backgroundColor: `${m.color}22`, color: m.color }}>
                                        {m.icon}
                                    </div>
                                    <h4>{m.title}</h4>
                                    <p>{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="transfer-details-card glass-card">
                            <div className="selected-method-header">
                                <div className="method-icon-wrap small" style={{ backgroundColor: `${method.color}22`, color: method.color }}>
                                    {method.icon}
                                </div>
                                <span>Transfer via {method.title}</span>
                            </div>

                            <form onSubmit={handleProceed} className="transfer-form">
                                <div className="form-group">
                                    <label>Recipient {method.title}</label>
                                    <input 
                                        type="text" 
                                        placeholder={`Enter ${method.title}`}
                                        className="styled-input"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount (₹)</label>
                                    <input 
                                        type="number" 
                                        placeholder="0.00"
                                        className="styled-input amount-input"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                    <span className="balance-hint">Balance: ₹ 1,24,500</span>
                                </div>
                                <button type="submit" className="btn-primary full-width mt-4">
                                    Continue
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="pin-modal-overlay"
                    >
                        <div className="pin-card glass-card">
                            <ShieldCheck size={48} className="text-accent mb-3 mx-auto shield-icon" />
                            <h3 className="text-center">Enter MPIN</h3>
                            <p className="text-center text-muted mb-4">To send ₹{amount} to {recipient}</p>
                            
                            <form onSubmit={handlePinSubmit}>
                                <div className="otp-inputs justify-center">
                                    <input 
                                        type="password" 
                                        className="otp-box pin-box" 
                                        maxLength={4} 
                                        placeholder="••••"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                                        autoFocus
                                    />
                                </div>
                                <button className="btn-primary full-width mt-4" disabled={pin.length < 4}>
                                    Verify & Pay
                                </button>
                                <button type="button" className="btn-text full-width mt-2" onClick={() => setStep(2)}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div 
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="success-card glass-card text-center"
                    >
                        <div className="success-icon-wrap mx-auto">
                            <CheckCircle2 size={64} className="text-success" />
                        </div>
                        <h2>Transfer Successful!</h2>
                        <p className="text-muted mt-2">₹{amount} has been sent to {recipient}</p>
                        
                        <div className="receipt-details text-left mt-4 mb-4">
                            <div className="receipt-row">
                                <span>Reference No</span>
                                <strong>#TRX{(Math.random() * 1000000).toFixed(0)}</strong>
                            </div>
                            <div className="receipt-row">
                                <span>Date & Time</span>
                                <strong>{new Date().toLocaleString()}</strong>
                            </div>
                        </div>

                        <button onClick={() => navigate('/home')} className="btn-primary full-width">
                            Back to Home
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Transfer;
