import React from "react";
import {
  FaBehance,
  FaDribbble,
  FaFigma,
  FaInstagram,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa";
import "./QuickLinks.css";

function QuickLinks() {
  const links = [
    { icon: <FaBehance />, name: "Behance" },
    { icon: <FaDribbble />, name: "Dribbble" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <FaInstagram />, name: "Instagram" },
    { icon: <FaPinterest />, name: "Pinterest" },
    { icon: <FaSnapchat />, name: "Snapchat" },
    { icon: <FaTiktok />, name: "TikTok" },
  ];

  return (
    <div className="quick-links">
      {links.map((link, index) => (
        <div key={index} className="link">
          {link.icon}
          <p>{link.name}</p>
        </div>
      ))}
      <div className="link add-link">+</div>
    </div>
  );
}

export default QuickLinks;
