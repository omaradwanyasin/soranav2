import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";
import "../pages/SearchResults.css";

export default function SearchResults() {
  const location = useLocation();
  const { searchQuery: initialQuery = "", results: initialResults = [] } =
    location.state || {};

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [votedPosts, setVotedPosts] = useState({});
  const [activeCategory, setActiveCategory] = useState("posts");
  const [videoErrors, setVideoErrors] = useState({});
  const [imageResults, setImageResults] = useState([]);
  const [topImages, setTopImages] = useState([]);
  const [topImagesLoading, setTopImagesLoading] = useState(true);
  const [failedImages, setFailedImages] = useState({});
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };
    }
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
    if (userId) {
      updateTokenBalance();
    }
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    if (initialQuery) {
      await Promise.all([
        fetchSummary(initialQuery),
        fetchTopImages(initialQuery),
      ]);
    }
  };

  const fetchSummary = async (query) => {
    setSummaryLoading(true);
    try {
      const response = await axios.get(
        `https://soranaapi.replit.app/summary?q=${encodeURIComponent(query)}`
      );
      setSummary(response.data.summary || "No summary available.");
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("An error occurred while fetching the summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const fetchTopImages = async (query) => {
    setTopImagesLoading(true);
    try {
      const response = await axios.get(
        `https://soranaapi.replit.app/search?q=${encodeURIComponent(
          query
        )}&category=2&n=3`
      );
      setTopImages(response.data.images || []);
    } catch (error) {
      console.error("Error fetching top images:", error);
      setTopImages([]);
    } finally {
      setTopImagesLoading(false);
    }
  };

  const updateTokenBalance = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.log("User is not logged in.");
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);

    try {
      const response = await axios.get(
        `https://soranaapi.replit.app/srt/balance/${userId}`,
        {
          headers: { accept: "application/json" },
        }
      );

      if (response.status === 200) {
        setTokenBalance(response.data.srt_balance);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (!isLoggedIn) {
      alert("Please log in to search.");
      return;
    }
    if (tokenBalance < 1) {
      alert("Not enough tokens to perform a search.");
      return;
    }
    setTokenBalance(prevBalance => prevBalance - 1);

    if (!query) return;
    setLoading(true);
    setImageLoading(true);

    try {
      const [postsResponse, imagesResponse] = await Promise.all([
        axios.get(
          `https://soranaapi.replit.app/search?q=${encodeURIComponent(
            query
          )}&category=1&n=10&language=en`
        ),
        axios.get(
          `https://soranaapi.replit.app/search?q=${encodeURIComponent(
            query
          )}&category=2&n=3`
        ),
      ]);

      const sortedResults = postsResponse.data.posts.sort(
        (a, b) => b.rank - a.rank
      );
      setResults(sortedResults);

      const images = imagesResponse.data.images || [];
      setImageResults(images);

      // Fetch new summary and top images
      fetchSummary(query);
      fetchTopImages(query);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
      setImageLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "images" && imageResults.length === 0) {
      fetchImages(10, searchQuery);
    }
  };

  const fetchImages = async (count, query) => {
    if (imageLoading) return;
    setImageLoading(true);
    try {
      const response = await axios.get(
        `https://soranaapi.replit.app/search?q=${encodeURIComponent(
          query
        )}&category=2&n=${count}`
      );
      const images = response.data.images || [];
      setImageResults(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImageResults([]);
    } finally {
      setImageLoading(false);
    }
  };

  const handleVote = async (postId, type) => {
    if (!isLoggedIn) {
      alert("Please log in to vote.");
      return;
    }
    if (tokenBalance < 1) {
      alert("Not enough tokens to vote.");
      return;
    }
    if (votedPosts[postId]) return;

    const userId = localStorage.getItem('user_id');
    const voteType = type === "upvote" ? "upvote" : "downvote";

    try {
      const response = await axios.post(
        `https://soranaapi.replit.app/voting/${voteType}?post_id=${postId}&user_id=${userId}`,
        {},
        { headers: { accept: "application/json" } }
      );

      if (response.data.success) {
        const newVotes = { ...votedPosts };
        newVotes[postId] = type;
        setVotedPosts(newVotes);

        const updatedResults = results.map((result) =>
          result.id === postId
            ? {
                ...result,
                votes: (result.votes || 0) + (type === "upvote" ? 1 : -1),
                rank: result.rank + (type === "upvote" ? 1 : -1),
              }
            : result
        );

        setResults(updatedResults.sort((a, b) => b.rank - a.rank));
        setTokenBalance(prevBalance => prevBalance + response.data.srt_earned - 1);
      } else {
        console.error("Vote failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const getEmbedUrl = (url) =>
    url.includes("youtube.com") ? url.replace("watch?v=", "embed/") : null;

  useEffect(() => {
    setFailedImages({});
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <div className="searchresultheader">
        <div className="search-bar">
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaMicrophone
            className="iconmic"
            onClick={() => recognition?.start()}
          />
          <button className="search-btn" onClick={() => handleSearch()}>
            <FaSearch /> Search
          </button>
          {loading && <div className="loading-animation">Loading...</div>}
        </div>
        <div className="token-display">
          {isLoggedIn ? (
            <p>Token balance: <strong>{tokenBalance}</strong></p>
          ) : (
            <p>Please log in to use tokens</p>
          )}
        </div>
      </div>
      <div className="category-filters">
        <button
          className={`category-btn ${
            activeCategory === "posts" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("posts")}
        >
          Posts
        </button>
        <button
          className={`category-btn ${
            activeCategory === "images" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("images")}
        >
          Images
        </button>
      </div>

      <div className="results-summary-container">
        <div className="results">
          <h2 className="search-results-title">Search Results</h2>
          {activeCategory === "posts" ? (
            results.length === 0 ? (
              <p>No results found.</p>
            ) : (
              results.map((result) => (
                <div key={result.id} className="result-item">
                  <h3>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  </h3>
                  <p>{result.description}</p>

                  {getEmbedUrl(result.url) && !videoErrors[result.id] ? (
                    <iframe
                      width="560"
                      height="315"
                      src={getEmbedUrl(result.url)}
                      title={result.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onError={() =>
                        setVideoErrors((prev) => ({
                          ...prev,
                          [result.id]: true,
                        }))
                      }
                    ></iframe>
                  ) : (
                    <p>Video not available</p>
                  )}

                  <div className="vote-buttons">
                    <button
                      onClick={() => handleVote(result.id, "upvote")}
                      className={
                        votedPosts[result.id] === "upvote" ? "voted" : ""
                      }
                      disabled={votedPosts[result.id] !== undefined}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </button>

                    <button
                      onClick={() => handleVote(result.id, "downvote")}
                      className={
                        votedPosts[result.id] === "downvote" ? "voted" : ""
                      }
                      disabled={votedPosts[result.id] !== undefined}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                  </div>
                  <button className="ai-rewrite-btn">
                    AI Rewrite (10 SRT)
                  </button>
                </div>
              ))
            )
          ) : (
            <div className="image-results">
              {imageResults.map((img, index) => (
                <img
                  key={index}
                  src={
                    failedImages[img.url]
                      ? "/placeholder.svg?height=200&width=200"
                      : img.url
                  }
                  alt={img.title}
                  className="result-image"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                  onError={() => {
                    setFailedImages((prev) => ({ ...prev, [img.url]: true }));
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="summary-box">
          <h3>Summary</h3>
          {summaryLoading ? (
            <p>Loading summary...</p>
          ) : (
            <p className="summary-text">{summary}</p>
          )}

          <h4>Top Images</h4>
          {topImagesLoading ? (
            <p>Loading top images...</p>
          ) : (
            <div className="top-images">
              <div className="image-grid">
                {topImages.map((img, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={
                        failedImages[img.url]
                          ? "/placeholder.svg?height=150&width=150"
                          : img.url
                      }
                      alt={img.title}
                      className="summary-image"
                      onError={() => {
                        setFailedImages((prev) => ({
                          ...prev,
                          [img.url]: true,
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {imageLoading && <SkeletonLoader />}
    </div>
  );
}