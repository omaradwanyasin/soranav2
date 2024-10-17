import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faVideo,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons"; // Import solid icons
import {
  faLinkedin, // Import LinkedIn icon
} from "@fortawesome/free-brands-svg-icons"; // Import brand icons
import "./Sidebar.css"; // Import CSS styles for Sidebar

const Sidebar = () => {
  const initialFavorites = [
    { name: "Gmail", url: "https://mail.google.com", icon: faEnvelope },
    { name: "YouTube", url: "https://www.youtube.com", icon: faVideo },
    { name: "LinkedIn", url: "https://www.linkedin.com", icon: faLinkedin }, // Replace Facebook with LinkedIn
  ];

  const [favorites] = useState(initialFavorites);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach mouse move and mouse up events to the window
  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="sidebar"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`, // Apply the position
      }}
      onMouseDown={handleMouseDown} // Start dragging
    >
      <ul>
        {favorites.map((site, index) => (
          <li key={index}>
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={site.icon} className="icon" />{" "}
              {/* Use Font Awesome icons */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
