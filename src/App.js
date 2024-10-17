import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components
import "./App.css";
import Search from "./pages/Search";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SignIn from "./pages/SignIn"; // Import SignIn component
import SignUp from "./pages/SignUp"; // Import SignUp component

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap your app in Router */}
      <div className="app">
        <Routes>
          {" "}
          {/* Use Routes to define your routes */}
          <Route path="/" element={<Home />} /> {/* Home as the first page */}
          <Route path="/signin" element={<SignIn />} /> {/* Add SignIn route */}
          <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
          <Route path="/search" element={<Search />} /> {/* Search page */}
          <Route path="/searchresult" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
