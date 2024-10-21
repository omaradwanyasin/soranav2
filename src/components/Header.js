import React from "react";
import { FaCheckCircle, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <div className="header-wrapper">
      <header className="header">
        <h1 className="logo">sorana</h1>
        <div className="features">
          <div className="feature">
            <FaCheckCircle className="feature-icon" />
            <p className="feature-text">real results, no noise</p>
          </div>
          <div className="feature">
            <FaUsers className="feature-icon" />
            <p className="feature-text">fully decentralized</p>
          </div>
          <div className="feature">
            <FaMoneyBillWave className="feature-icon" />
            <p className="feature-text">earn while you search</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
