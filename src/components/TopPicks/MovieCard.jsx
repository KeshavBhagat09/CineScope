import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import RatingIcon from "../../assets/RatingIcon"; // Your SVG/icon component
import axios from "axios";

const MovieCard = ({ title, posterSrc, rating, year, type, movieId }) => {
  const { watchlist, setWatchlist } = useOutletContext();
  const [showRatingOptions, setShowRatingOptions] = useState(false); // Toggle rating options
  const [userRating, setUserRating] = useState(0); // User's selected rating
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your backend API base URL
  const API_URL = "http://localhost:8000/api/v1/rating"; // Adjust as needed
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const handleAddToWatchlist = () => {
    const movieData = { title, posterUrl: posterSrc, rating, year, type, watched: false };

    if (!watchlist.some((movie) => movie.title === title)) {
      setWatchlist([...watchlist, movieData]);
      alert("Added to Watchlist! ✅");
    } else {
      alert("Already in Watchlist! ⚠️");
    }
  };

  // Handle rating submission
  const handleRatingSubmit = async (selectedRating) => {
    setLoading(true);
    setError(null);
  
    const token = localStorage.getItem("token"); // Moved inside function
    console.log("Token being sent:", token);
    console.log("Submitting to:", `${API_URL}/add`);
    console.log("Payload:", { movieId, rating: selectedRating });
  
    if (!token) {
      setError("You must be logged in to rate a movie");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        `${API_URL}/add`,
        { movieId, rating: selectedRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setUserRating(selectedRating);
      setShowRatingOptions(false);
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Failed to submit rating: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Render star options (1 to 5)
  const renderStarOptions = () => {
    return (
      <div className="absolute z-10 bg-neutral-800 p-2 rounded-md shadow-lg mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="cursor-pointer text-2xl mx-1"
            style={{ color: star <= userRating ? "gold" : "gray" }}
            onClick={() => handleRatingSubmit(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col p-2 rounded-lg bg-neutral-700 bg-opacity-10 w-[160px] sm:w-[200px] md:w-[220px] lg:w-[250px]">
      <img
        loading="lazy"
        src={posterSrc}
        className="rounded-md w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] object-cover"
        alt={`Movie poster for ${title}`}
      />
      <div className="mt-2 text-lg font-semibold text-stone-300 truncate">
        {title}
      </div>

      <div className="flex items-center justify-between mt-1 text-sm text-stone-300">
        <span>⭐ {rating}</span>
        <div className="relative">
          <RatingIcon
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setShowRatingOptions(!showRatingOptions)} // Toggle star options
          />
          {showRatingOptions && renderStarOptions()}
        </div>
      </div>

      <button
        onClick={handleAddToWatchlist}
        className="mt-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-all"
      >
        + Add to Watchlist
      </button>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {loading && <p className="text-stone-300 text-xs mt-1">Submitting...</p>}
    </div>
  );
};

export default MovieCard;