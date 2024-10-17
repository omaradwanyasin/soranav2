// home.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css"; // Import CSS styles

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate("/search"); // Navigate to the search page
  };

  const handleSignIn = () => {
    navigate("/signin"); // Navigate to the sign-in page
  };

  return (
    <div className="home-container">
      <div className="header">
        <button className="sign-in-button" onClick={handleSignIn}>
          <span>Sign in</span>
        </button>
      </div>
      <div className="content">
        <h1>Sorana</h1>
        <h1>
          Be the web. Own the web.
          <br />
        </h1>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get started <span>&rarr;</span>
        </button>
      </div>
      <div className="footer">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/faq">FAQ</a>
      </div>
    </div>
  );
};

export default Home;
