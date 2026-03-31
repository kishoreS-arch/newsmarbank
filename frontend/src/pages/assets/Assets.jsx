import React from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { TrendingUp, TrendingDown, Gem, Coins } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../styles/assets.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Assets = () => {
    const donutData = {
        labels: ["Savings", "Stocks", "Gold", "Fixed Deposit"],
        datasets: [{
            data: [45, 25, 15, 15],
            backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#f472b6"],
            borderWidth: 0,
        }]
    };

    const donutOptions = {
        cutout: "72%",
        plugins: { legend: { display: false } },
        maintainAspectRatio: false
    };

    const assetItems = [
        { label: "Savings Account", value: "₹ 1,24,500", change: "+2.1%", up: true, color: "#6366f1" },
        { label: "Stocks & MF", value: "₹ 68,000", change: "+8.4%", up: true, color: "#10b981" },
        { label: "Gold Holdings", value: "₹ 41,250", change: "-0.3%", up: false, color: "#f59e0b" },
        { label: "Fixed Deposit", value: "₹ 50,000", change: "+6.5%", up: true, color: "#f472b6" },
    ];

    const metalRates = [
        { name: "Gold (24K / gm)", rate: "₹ 6,450", change: "-₹ 20", up: false },
        { name: "Silver (gm)", rate: "₹ 80.50", change: "+₹ 1.2", up: true },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="assets-container"
        >
            <h2 className="page-title">Net Worth</h2>

            {/* Donut Chart */}
            <div className="networth-card glass-card">
                <div className="donut-wrapper">
                    <Doughnut data={donutData} options={donutOptions} />
                    <div className="donut-center">
                        <span className="donut-label">Total</span>
                        <span className="donut-value">₹2.83L</span>
                    </div>
                </div>
                <div className="legend-list">
                    {assetItems.map((a, i) => (
                        <div key={i} className="legend-item">
                            <div className="legend-dot" style={{ background: a.color }}></div>
                            <span className="legend-name">{a.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Asset Breakdown */}
            <h3 className="section-title mt-4">Asset Breakdown</h3>
            <div className="asset-list">
                {assetItems.map((a, i) => (
                    <div key={i} className="asset-row glass-card">
                        <div className="asset-dot" style={{ background: a.color }}></div>
                        <div className="asset-info">
                            <div className="asset-label">{a.label}</div>
                            <div className="asset-value">{a.value}</div>
                        </div>
                        <div className={`asset-change ${a.up ? "up" : "down"}`}>
                            {a.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            {a.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Live Metal Rates */}
            <h3 className="section-title mt-4">Live Metal Rates</h3>
            <div className="metal-grid">
                {metalRates.map((m, i) => (
                    <div key={i} className="metal-card glass-card">
                        <div className="metal-icon">
                            {i === 0 ? <Gem size={28} /> : <Coins size={28} />}
                        </div>
                        <div className="metal-name">{m.name}</div>
                        <div className="metal-rate">{m.rate}</div>
                        <div className={`metal-change ${m.up ? "up" : "down"}`}>{m.change} today</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Assets;
