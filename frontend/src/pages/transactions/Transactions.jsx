import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { 
    Search, Filter, ShoppingBag, Utensils, 
    Home, CreditCard, Car, Zap, ArrowUpRight, ArrowDownLeft 
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "../../styles/transactions.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Transactions = () => {
    const [filter, setFilter] = useState("All");

    const categories = {
        Shopping: { icon: <ShoppingBag />, color: "#f472b6" },
        Food: { icon: <Utensils />, color: "#fb923c" },
        Rent: { icon: <Home />, color: "#60a5fa" },
        Bills: { icon: <Zap />, color: "#facc15" },
        Transport: { icon: <Car />, color: "#4ade80" },
        Income: { icon: <ArrowDownLeft />, color: "#2dd4bf" }
    };

    const transactionData = [
        { id: 1, name: "Amazon", category: "Shopping", amount: -2500, date: "2 Hours ago" },
        { id: 2, name: "Swiggy", category: "Food", amount: -450, date: "Today, 1:00 PM" },
        { id: 3, name: "Salary", category: "Income", amount: 75000, date: "Yesterday" },
        { id: 4, name: "Airtel Bill", category: "Bills", amount: -999, date: "28 Mar" },
        { id: 5, name: "Uber", category: "Transport", amount: -320, date: "27 Mar" },
        { id: 6, name: "Zara", category: "Shopping", amount: -4200, date: "26 Mar" },
    ];

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {
                label: 'Expenses',
                data: [45000, 52000, 38000, 42000],
                backgroundColor: '#6366f1',
                borderRadius: 8,
            }
        ],
    };

    const filteredTx = filter === "All" ? transactionData : transactionData.filter(t => t.category === filter);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tx-page-container"
        >
            <h2 className="page-title">Activity</h2>

            {/* Chart Section */}
            <div className="chart-card glass-card">
                <div className="chart-header">
                    <h4>Spending Analysis</h4>
                    <span className="total-outflow">-₹ 42,000 this month</span>
                </div>
                <div className="chart-wrapper">
                    <Bar data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
            </div>

            {/* Filters */}
            <div className="filter-scroll">
                {["All", ...Object.keys(categories)].map(cat => (
                    <button 
                        key={cat}
                        className={`filter-chip ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Tx List */}
            <div className="tx-list-full">
                {filteredTx.map(tx => (
                    <motion.div layout key={tx.id} className="tx-row glass-card">
                        <div className="tx-icon-large" style={{ color: categories[tx.category].color, background: `${categories[tx.category].color}22` }}>
                            {categories[tx.category].icon}
                        </div>
                        <div className="tx-main-info">
                            <div className="tx-name-text">{tx.name}</div>
                            <div className="tx-cat-text">{tx.category} • {tx.date}</div>
                        </div>
                        <div className={`tx-val-text ${tx.amount > 0 ? 'pos' : 'neg'}`}>
                            {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Transactions;
