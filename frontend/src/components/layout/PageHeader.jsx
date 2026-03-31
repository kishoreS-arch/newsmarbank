import React from "react";
import useTheme from "../../hooks/useTheme";
import { User, Sun, Accessibility, Eye, Menu } from "lucide-react";
import "../../styles/header.css";

const PageHeader = () => {
    const { theme, setNormal, setSenior, setVisual } = useTheme();

    return (
        <header className="page-header fixed-top glass-card">
            <div className="header-content container">
                <div className="logo-section">
                    <div className="logo-icon">SB</div>
                    <h1 className="logo-text">SmartBank</h1>
                </div>

                <div className="mode-switcher">
                    <button 
                        onClick={setNormal} 
                        className={`mode-btn ${theme === 'normal' ? 'active' : ''}`}
                        title="Normal Mode"
                    >
                        <Sun size={20} />
                    </button>
                    <button 
                        onClick={setSenior} 
                        className={`mode-btn ${theme === 'senior' ? 'active' : ''}`}
                        title="Senior Mode"
                    >
                        <Accessibility size={20} />
                    </button>
                    <button 
                        onClick={setVisual} 
                        className={`mode-btn ${theme === 'visual' ? 'active' : ''}`}
                        title="Visual Mode"
                    >
                        <Eye size={20} />
                    </button>
                </div>

                <div className="profile-section">
                   <button className="profile-btn"><User size={22} /></button>
                </div>
            </div>
        </header>
    );
};

export default PageHeader;
