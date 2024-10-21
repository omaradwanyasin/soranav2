import React, { useState, useEffect } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import "./SearchBar.css";

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false); // Control width state
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id"); // User ID fetched from localStorage

  // Check for browser SpeechRecognition support
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get recognized text
        setSearchQuery(transcript); // Update search input with recognized text
      };
      recognition.onend = () => {
        console.log("Speech recognition ended");
      };
    }
  }, [recognition]);

  // Handle search action
  const handleSearch = async () => {
    if (!searchQuery) return; // Prevent empty searches
    setLoading(true); // Set loading to true

    try {
      const response = await axios.get(
        `https://soranaapi.replit.app/search?q=${encodeURIComponent(
          searchQuery
        )}&category=1&n=10&language=en`
      );
      console.log("API Response:", response.data); // Log the response

      // Update token balance after search
      await updateTokenBalance();

      // Navigate to search results page with the fetched results
      navigate("/searchresults", {
        state: { searchQuery, results: response.data.posts },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const updateTokenBalance = async () => {
    try {
      const response = await axios.put(
        `https://soranaapi.replit.app/srt/update_balance/${userId}?amount=2`,
        {},
        { headers: { Accept: "application/json" } }
      );
      if (response.data.success) {
        console.log("Token balance updated successfully");
      }
    } catch (error) {
      console.error("Error updating token balance:", error);
    }
  };

  const handleMicClick = () => {
    if (recognition) recognition.start(); // Start voice recognition
  };

  return (
    <div
      className={`search-bar ${isExpanded ? "expanded" : ""}`} // Apply expanded class
      onClick={() => setIsExpanded(true)} // Expand on click
      onBlur={() => setIsExpanded(false)} // Collapse on blur
      tabIndex={0} // Enable blur to trigger properly
    >
      <input
        type="text"
        placeholder="What are you looking for today?"
        className="search-input"
        value={searchQuery} // Bind input value to state
        onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
      />
      <FaMicrophone className="iconmic" onClick={handleMicClick} />{" "}
      {/* Start voice recognition */}
      <button className="search-btn" onClick={handleSearch}>
        <FaSearch /> Search
      </button>
      {loading && <div className="loading-animation">Loading...</div>}{" "}
      {/* Show loading animation */}
    </div>
  );
}

export default SearchBar;
