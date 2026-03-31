import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flashlight, Image, CheckCircle2, ShieldCheck } from "lucide-react";
import jsQR from "jsqr";
import "../../styles/scan.css";

const Scan = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    const [step, setStep] = useState(1); // 1: Scan, 2: Amount, 3: PIN, 4: Success
    const [scannedData, setScannedData] = useState(null);
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [flashOn, setFlashOn] = useState(false);

    // Mock QR scanning effect since we can't reliably access webcam in all iframe environments
    useEffect(() => {
        let timer;
        if (step === 1) {
             timer = setTimeout(() => {
                 setScannedData({ name: "Starbucks Coffee", upiId: "starbucks@ybl" });
                 setStep(2);
             }, 3000); // Auto-scan mock after 3 seconds
        }
        return () => clearTimeout(timer);
    }, [step]);

    const handleAmountSubmit = (e) => {
        e.preventDefault();
        if (amount > 0) setStep(3);
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin.length === 4) setStep(4);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="scan-container"
        >
            <div className="page-header-row p-4">
                <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="page-title mb-0">Pay via QR</h2>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="scanner-view"
                    >
                        <div className="scanner-frame">
                            <div className="corner top-left"></div>
                            <div className="corner top-right"></div>
                            <div className="corner bottom-left"></div>
                            <div className="corner bottom-right"></div>
                            
                            {/* Scanning Animation */}
                            <div className="scan-line"></div>
                            
                            <div className="scanner-mock-text">
                                <p>Align QR Code within the frame</p>
                                <span className="text-muted">(Auto-scanning in 3s for demo)</span>
                            </div>
                        </div>

                        <div className="scanner-controls">
                            <button className={`control-btn ${flashOn ? 'active' : ''}`} onClick={() => setFlashOn(!flashOn)}>
                                <Flashlight size={24} />
                            </button>
                            <button className="control-btn">
                                <Image size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="payment-card glass-card p-4 mx-3"
                    >
                        <div className="merchant-info text-center mb-4">
                            <div className="merchant-avatar mx-auto mb-2">
                                {scannedData?.name.charAt(0)}
                            </div>
                            <h3>{scannedData?.name}</h3>
                            <p className="text-muted">{scannedData?.upiId}</p>
                        </div>

                        <form onSubmit={handleAmountSubmit}>
                            <div className="amount-input-wrapper justify-center text-center">
                                <span className="currency-symbol">₹</span>
                                <input 
                                    type="number" 
                                    className="huge-amount-input text-center"
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    autoFocus
                                />
                            </div>
                             <div className="text-center mb-4">
                                <span className="balance-hint">Balance: ₹ 1,24,500</span>
                            </div>
                            
                            <button type="submit" className="btn-primary full-width" disabled={!amount}>
                                Proceed to Pay
                            </button>
                        </form>
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
                            <p className="text-center text-muted mb-4">To pay ₹{amount} to {scannedData?.name}</p>
                            
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
                        className="success-card glass-card text-center mx-3"
                    >
                        <div className="success-icon-wrap mx-auto">
                            <CheckCircle2 size={64} className="text-success" />
                        </div>
                        <h2>Payment Successful!</h2>
                        <p className="text-muted mt-2">₹{amount} paid to {scannedData?.name}</p>
                        
                        <div className="receipt-details text-left mt-4 mb-4">
                            <div className="receipt-row">
                                <span>Txn ID</span>
                                <strong>#QRX{(Math.random() * 1000000).toFixed(0)}</strong>
                            </div>
                            <div className="receipt-row">
                                <span>Date</span>
                                <strong>{new Date().toLocaleString()}</strong>
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

export default Scan;
