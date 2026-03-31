import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Building, CheckCircle2 } from "lucide-react";
import "../../styles/deposit.css";

const Deposit = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("card"); // 'card' or 'bank'
    const [isLoading, setIsLoading] = useState(false);

    const presetAmounts = [500, 1000, 5000, 10000];

    const handleDeposit = (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) return;
        
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="deposit-container"
        >
            <div className="page-header-row">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="page-title mb-0">Add Money</h2>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="deposit-card glass-card"
                    >
                        <form onSubmit={handleDeposit}>
                            <div className="amount-input-wrapper text-center">
                                <span className="currency-symbol">₹</span>
                                <input 
                                    type="number" 
                                    className="huge-amount-input"
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="preset-amounts">
                                {presetAmounts.map(preset => (
                                    <button 
                                        type="button" 
                                        key={preset}
                                        className="preset-btn"
                                        onClick={() => setAmount(preset)}
                                    >
                                        +₹{preset}
                                    </button>
                                ))}
                            </div>

                            <div className="payment-methods mt-4">
                                <h4 className="mb-3 text-muted" style={{ fontSize: '0.9rem' }}>Select Payment Method</h4>
                                <div className="method-toggle">
                                    <button 
                                        type="button" 
                                        className={`method-btn ${method === 'card' ? 'active' : ''}`}
                                        onClick={() => setMethod('card')}
                                    >
                                        <CreditCard size={20} /> Debit Card
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`method-btn ${method === 'bank' ? 'active' : ''}`}
                                        onClick={() => setMethod('bank')}
                                    >
                                        <Building size={20} /> Net Banking
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-primary full-width mt-4" 
                                disabled={!amount || isLoading}
                            >
                                {isLoading ? "Processing..." : `Add ₹${amount || '0'}`}
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="success-card glass-card text-center"
                    >
                        <div className="success-icon-wrap mx-auto">
                            <CheckCircle2 size={64} className="text-success" />
                        </div>
                        <h2>Money Added!</h2>
                        <p className="text-muted mt-2">₹{amount} has been added to your account via {method === 'card' ? 'Debit Card' : 'Net Banking'}.</p>
                        
                        <div className="receipt-details text-left mt-4 mb-4">
                            <div className="receipt-row">
                                <span>New Balance</span>
                                <strong>₹{(124500 + Number(amount)).toLocaleString()}</strong>
                            </div>
                        </div>

                        <button onClick={() => navigate('/home')} className="btn-primary full-width">
                            Done
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Deposit;
