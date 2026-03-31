import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Target } from "lucide-react";
import "../../styles/budget.css";

const Budget = () => {
    const budgets = [
        { id: 1, category: "Shopping", spent: 12500, limit: 15000, color: "#f472b6" },
        { id: 2, category: "Food & Dining", spent: 8400, limit: 10000, color: "#fb923c" },
        { id: 3, category: "Transport", spent: 4200, limit: 5000, color: "#4ade80" },
        { id: 4, category: "Entertainment", spent: 3000, limit: 3000, color: "#c084fc" }
    ];

    const generateSavingsTip = () => {
        return "You're spending 80% on Shopping. Reduce Zara visits to save ₹2,500 this month!";
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="budget-container"
        >
            <h2 className="page-title">Wealth & Budget</h2>

            {/* AI Insights Card */}
            <div className="ai-insight-card glass-card">
                <div className="insight-header">
                    <Sparkles className="text-yellow" size={20} />
                    <h4>AI Financial Insight</h4>
                </div>
                <p className="insight-text">{generateSavingsTip()}</p>
                <div className="insight-footer">
                    <TrendingUp size={16} />
                    <span>On track to save ₹12,000 this month</span>
                </div>
            </div>

            {/* Budget Progress */}
            <h3 className="section-title">Monthly Budgets</h3>
            <div className="budget-list">
                {budgets.map(b => {
                    const percent = (b.spent / b.limit) * 100;
                    const isWarning = percent > 85;
                    const isExceeded = percent >= 100;

                    return (
                        <div key={b.id} className="budget-item glass-card">
                            <div className="budget-info">
                                <div className="budget-cat">
                                    <span className="dot" style={{ backgroundColor: b.color }}></span>
                                    {b.category}
                                </div>
                                <div className="budget-amounts">
                                    ₹{b.spent.toLocaleString()} / ₹{b.limit.toLocaleString()}
                                </div>
                            </div>
                            
                            <div className="progress-bg">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(percent, 100)}%` }}
                                    className={`progress-fill ${isExceeded ? 'danger' : isWarning ? 'warning' : ''}`}
                                    style={{ backgroundColor: (!isWarning && !isExceeded) ? b.color : undefined }}
                                />
                            </div>

                            {isWarning && !isExceeded && (
                                <div className="budget-alert warning">
                                    <AlertTriangle size={14} /> Near Limit
                                </div>
                            )}
                            {isExceeded && (
                                <div className="budget-alert danger">
                                    <AlertTriangle size={14} /> Budget Exceeded
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Goals */}
            <h3 className="section-title mt-4">Savings Goals</h3>
            <div className="goal-card glass-card">
                <div className="goal-icon">
                    <Target size={24} />
                </div>
                <div className="goal-details">
                    <h4>Emergency Fund</h4>
                    <p>₹1,50,000 / ₹5,00,000</p>
                    <div className="progress-bg mt-2">
                        <div className="progress-fill" style={{ width: '30%', backgroundColor: '#6366f1' }}></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Budget;
