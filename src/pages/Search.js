import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import QuickLinks from "../components/QuickLinks";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Stories from "../components/Stories";
import "../App.css";

function Search() {
  return (
    <div className="content-wrapper">
      <Sidebar /> {/* Add Sidebar here */}
      <div className="main-content"> {/* Wrap main content for layout */}
        <Header />
        <SearchBar />
        <QuickLinks />
      </div>
    </div>
  );
}

export default Search;
