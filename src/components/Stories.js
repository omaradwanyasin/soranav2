import React, { useState } from "react";
import "./Stories.css";

const categories = [
  "All",
  "Top Stories",
  "Health",
  "Weather",
  "Dining",
  "Entertainment",
  "Travel",
  "Sports",
];

function Stories() {
  const [active, setActive] = useState("All");

  return (
    <div className="stories">
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${active === category ? "active" : ""}`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="story-cards">
        <div className="story-card">Story 1</div>
        <div className="story-card">Story 2</div>
        <div className="story-card">Story 3</div>
      </div>
    </div>
  );
}

export default Stories;
