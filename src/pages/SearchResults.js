import React, { useState } from "react";
import "./SearchResults.css"; // Import CSS styles for the search results page
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const SearchResults = () => {
  // Static data for search results
  const results = [
    {
      id: 1,
      title: "Influence: The Psychology of Persuasion",
      summary:
        "A classic book by Robert Cialdini that explores the psychology behind why people say 'yes' and how to apply these understandings in business and everyday situations.",
      content:
        "This book delves into the principles of influence and how they can be used effectively in marketing strategies. Cialdini discusses six key principles of persuasion: reciprocity, commitment, social proof, authority, liking, and scarcity.",
      votes: { up: 0, down: 0 }, // Initialize votes
    },
    {
      id: 2,
      title: "Contagious: How to Build Word of Mouth in the Digital Age",
      summary:
        "Written by Jonah Berger, this book explains why certain ideas and products go viral and how to leverage this knowledge for marketing success.",
      content:
        "Berger outlines six principles that drive people to share content: social currency, triggers, emotion, public, practical value, and stories. This book is essential for marketers looking to create contagious content.",
      votes: { up: 0, down: 0 }, // Initialize votes
    },
    {
      id: 3,
      title:
        "Building a StoryBrand: Clarify Your Message So Customers Will Listen",
      summary:
        "Donald Miller's book focuses on the importance of storytelling in marketing and how to create a clear message that resonates with customers.",
      content:
        "Miller introduces the StoryBrand Framework, which helps businesses simplify their messaging and connect with customers by positioning them as the hero of the story. This approach can significantly enhance marketing effectiveness.",
      votes: { up: 0, down: 0 }, // Initialize votes
    },
  ];

  // State to manage votes
  const [voteCounts, setVoteCounts] = useState(results);

  const handleVote = (id, type) => {
    setVoteCounts((prevVotes) => {
      return prevVotes.map((result) => {
        if (result.id === id) {
          return {
            ...result,
            votes: {
              ...result.votes,
              up: type === "up" ? result.votes.up + 1 : result.votes.up,
              down: type === "down" ? result.votes.down + 1 : result.votes.down,
            },
          };
        }
        return result;
      });
    });
  };

  const handleRewrite = (id) => {
    // Placeholder for AI rewrite functionality
    alert(`AI Rewrite requested for: ${id}`);
  };

  return (
    <div className="search-results-container">
      <div className="searchresultheader">
        <SearchBar />
        <div className="button-container">
          <button className="result-button">Posts</button>
          <button className="result-button">Images</button>
        </div>
      </div>
      <div className="results-summary-container">
        <div className="results">
          <h2 className="search-results-title">
            Search Results for "Best Books to Read About Marketing"
          </h2>
          {voteCounts.map((result) => (
            <div key={result.id} className="result-item">
              <h3>{result.title}</h3>
              <p>{result.summary}</p>
              <p>{result.content}</p> {/* Displaying content for each result */}
              <div className="vote-buttons">
                <button
                  className="vote-buttons"
                  onClick={() => handleVote(result.id, "up")}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />{" "}
                  {<span style={{ paddingLeft: 5 }}>{result.votes.up}</span>}
                </button>
                <button
                  className="vote-buttons"
                  onClick={() => handleVote(result.id, "down")}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />{" "}
                  {<span style={{ paddingLeft: 5 }}>{result.votes.down}</span>}
                </button>
              </div>
              <button
                className="ai-rewrite-btn"
                onClick={() => handleRewrite(result.id)}
              >
                AI Rewrite
              </button>
            </div>
          ))}
        </div>
        <div className="summary-box">
          <h2>Summary</h2>
          <p>This box contains a summary of the search results.</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
