import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChartPie, Clock, Shield } from "lucide-react";
import "../../styles/bottom-nav.css";

const BottomNav = () => {
    const location = useLocation();
    
    // Hide nav on login page (path = '/')
    if (location.pathname === "/") return null;

    return (
        <nav className="bottom-nav glass-card">
            <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
                <Home size={24} />
                <span>Home</span>
            </Link>
            <Link to="/transactions" className={`nav-item ${location.pathname === '/transactions' ? 'active' : ''}`}>
                <Clock size={24} />
                <span>Activity</span>
            </Link>
            <Link to="/scan" className="nav-item scan-btn">
                <div className="scan-icon-wrapper">
                   <Shield size={28} />
                </div>
            </Link>
            <Link to="/budget" className={`nav-item ${location.pathname === '/budget' ? 'active' : ''}`}>
                <ChartPie size={24} />
                <span>Wealth</span>
            </Link>
            <Link to="/assets" className={`nav-item ${location.pathname === '/assets' ? 'active' : ''}`}>
                <Shield size={24} />
                <span>Assets</span>
            </Link>
        </nav>
    );
};

export default BottomNav;
