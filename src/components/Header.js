import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaGlobe,
  FaCheckCircle,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import "../components/Header.css";

function Header() {
  return (
    <div className="header1">
      <h1>sorana</h1>
      <div className="features">
        <div className="feature">
          <FaCheckCircle /> <p>real results, no noise</p>
        </div>
        <div className="feature">
          <FaUsers /> <p>fully decentralized</p>
        </div>
        <div className="feature">
          <FaMoneyBillWave /> <p>earn while you search</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
