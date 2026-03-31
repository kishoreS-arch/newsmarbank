import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import "../../styles/chatbot.css";

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your SmartBank Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const intents = {
        balance: ["balance", "money", "how much"],
        statement: ["statement", "history", "transactions"],
        transfer: ["transfer", "send money", "pay"],
        card: ["card", "credit card", "debit card", "block"],
        loan: ["loan", "emi", "borrow"],
        senior: ["senior", "help", "guide"],
        visual: ["voice", "audio", "blind"],
        contact: ["customer care", "call", "help desk"],
        rewards: ["points", "rewards", "cashback"],
        security: ["password", "pin", "secure", "phishing"],
        atm: ["atm", "near me", "location"],
        deposit: ["deposit", "fix deposit", "savings"],
        insurance: ["insurance", "policy", "health"],
        offers: ["offers", "deals", "discounts"],
        gold: ["gold", "metal", "rates"]
    };

    const getBotResponse = (text) => {
        const query = text.toLowerCase();
        
        if (intents.balance.some(k => query.includes(k))) return "Your current balance is ₹ 1,24,500.50.";
        if (intents.statement.some(k => query.includes(k))) return "I've listed your recent transactions on the Activity page.";
        if (intents.transfer.some(k => query.includes(k))) return "Sure, redirecting you to the transfer page...";
        if (intents.loan.some(k => query.includes(k))) return "You are eligible for a pre-approved loan of up to ₹ 5 Lakhs.";
        if (intents.senior.some(k => query.includes(k))) return "I can enable Senior Mode for you. Should I?";
        if (intents.visual.some(k => query.includes(k))) return "You can use the 'Visual Mode' for high contrast and voice assistance.";
        if (intents.gold.some(k => query.includes(k))) return "Today's Gold Rate: ₹ 6,450/gm (24K).";
        
        return "I'm not sure about that. Try asking about balance, loans, or gold rates!";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        setTimeout(() => {
            const botMsg = { role: 'bot', text: getBotResponse(input) };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    return (
        <div className="chatbot-wrapper">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        className="chatbot-window glass-card"
                    >
                        <div className="chat-header">
                            <div className="bot-info">
                                <div className="bot-avatar">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <div className="bot-name">Smart Assistant</div>
                                    <div className="online-status">Online</div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                        </div>

                        <div className="messages-area" ref={scrollRef}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`msg-bubble-wrapper ${msg.role}`}>
                                    <div className={`msg-bubble ${msg.role}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form className="chat-input-area" onSubmit={handleSendMessage}>
                            <input 
                                type="text" 
                                placeholder="Ask about balance, loans..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit">
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="chatbot-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                {!isOpen && <div className="notif-ping"></div>}
            </motion.button>
        </div>
    );
};

export default AIChatbot;
