import React from "react";
import PropTypes from "prop-types";
import "./YouTubeEmbed.css"; // Optional: for styling

const YouTubeEmbed = ({ url }) => {
  const videoId = url.split("v=")[1].split("&")[0]; // Extract video ID from URL

  return (
    <div className="youtube-responsive-container">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

YouTubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
};

export default YouTubeEmbed;
