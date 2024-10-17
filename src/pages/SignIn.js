import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignIn.css"; // Import CSS styles for SignIn

const SignIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign-in logic here (e.g., API call)
    console.log("Signing in with:", { email, password });
    // Navigate to the home page or another page after sign-in
    navigate("/"); // Redirect to home after sign-in
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
      <div className="footer">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/signup">Create an Account</a>
      </div>
    </div>
  );
};

export default SignIn;
