import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/shared-theme.css";

// Components
import PageHeader from "./components/layout/PageHeader";
import BottomNav from "./components/layout/BottomNav";
import AIChatbot from "./components/ai/AIChatbot";
import VoiceAssist from "./components/accessibility/VoiceAssist";

// Pages
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import Transactions from "./pages/transactions/Transactions";
import Budget from "./pages/budget/Budget";
import Reminders from "./pages/reminders/Reminders";
import Assets from "./pages/assets/Assets";
import Transfer from "./pages/transfer/Transfer";
import Deposit from "./pages/deposit/Deposit";
import Scan from "./pages/scan/Scan";
import Statement from "./pages/statement/Statement";

function App() {
  return (
    <Router>
      <PageHeader />
      <VoiceAssist />
      <div className="main-content container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/statement" element={<Statement />} />
        </Routes>
      </div>
      <BottomNav />
      <AIChatbot />
    </Router>
  );
}

export default App;
