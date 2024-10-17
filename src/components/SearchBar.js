import React, { useState, useEffect } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false); // State to control width
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  // Check for browser support for SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the recognized text
        setSearchQuery(transcript); // Update the search input with the recognized text
      };

      recognition.onend = () => {
        console.log("Speech recognition service disconnected");
      };
    }
  }, [recognition]);

  const handleSearch = () => {
    navigate("/searchresult");
  };

  const handleMicClick = () => {
    if (recognition) {
      recognition.start(); // Start voice recognition
    }
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
      <FaMicrophone className="iconmic" onClick={handleMicClick} /> {/* Start voice recognition on click */}
      <button className="search-btn" onClick={handleSearch}>
        <FaSearch /> Search
      </button>
    </div>
  );
}

export default SearchBar;
