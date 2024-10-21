// SkeletonLoader.js
import React from "react";
import "./SkeletonLoader.css"; // Add styles as needed

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
    </div>
  );
};

export default SkeletonLoader;
