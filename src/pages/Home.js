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
      <div className="header2">
        <button className="sign-in-button" onClick={handleSignIn}>
          <span>sign in</span>
        </button>
      </div>
      <div className="content">
        <h1>sorana</h1>
        <h1>
          be the web. own the web.
          <br />
        </h1>
        <button className="get-started-button" onClick={handleGetStarted}>
          get started <span>&rarr;</span>
        </button>
      </div>
      <div className="footerr">
        <a href="/privacy">privacy</a>
        <a href="/terms">terms</a>
        <a href="/faq">faq</a>
      </div>
    </div>
  );
};

export default Home;
