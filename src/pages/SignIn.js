import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Import CSS styles

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleSignIn = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    try {
      const response = await fetch("https://soranaapi.replit.app/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Store user details and token in localStorage
      localStorage.setItem("user_token", data.srt_balance);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("expires_in", data.expires_in);
      localStorage.setItem("isLoggedIn", true); // Set logged-in flag in localStorage

      // Update state to reflect login
      setIsLoggedIn(true);

      // Navigate to search page
      navigate("/search");
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      {error && <p className="error-message">{error}</p>}
      {isLoggedIn && <p className="success-message">Logged in successfully!</p>}
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      <div className="footer">
        <a href="/signup">Create an Account</a>
      </div>
    </div>
  );
};

export default SignIn;
