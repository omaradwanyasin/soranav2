import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignUp.css"; // Import CSS styles for SignUp

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Prepare the request body
    const requestBody = {
      name: name,
      email: email,
      password: password,
    };

    try {
      // Send POST request to the API
      const response = await fetch('https://soranaapi.replit.app/auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error('Sign-up failed. Please check your details.');
      }

      // Parse the response data
      const data = await response.json();
      console.log("Sign-up successful:", data);

      // Navigate to the sign-in page or another page after sign-up
      navigate("/signin"); // Redirect to sign-in page after sign-up
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError(error.message); // Set error message to state
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name" // Placeholder text
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" // Placeholder text
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" // Placeholder text
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password" // Placeholder text
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="footer">
        <a href="/signin">Already have an account? Sign In</a>
      </div>
    </div>
  );
};

export default SignUp;
