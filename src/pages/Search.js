import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import QuickLinks from "../components/QuickLinks";
import Sidebar from "../components/Sidebar";
import "../App.css";
import Stories from "../components/Stories";

function Search() {
  const navigate = useNavigate();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const userId = localStorage.getItem("user_id");

  const fetchTokenBalance = async () => {
    try {
      const response = await fetch(
        `https://soranaapi.replit.app/srt/balance/${userId}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );
      const data = await response.json();
      setTokenBalance(data.srt_balance);
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchTokenBalance();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="content-wrapper">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="token-display">
          <p>
            token balance: <strong>{tokenBalance}</strong>
          </p>
        </div>
        <div>
          <SearchBar />
          {!isMobile && <QuickLinks />}
        </div>
      </div>
    </div>
  );
}

export default Search;
