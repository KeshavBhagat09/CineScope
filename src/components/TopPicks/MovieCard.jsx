import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import RatingIcon from "../../assets/RatingIcon";

const MovieCard = ({ title, posterSrc, rating, year, type }) => {
  const { watchlist, setWatchlist } = useOutletContext();
  const [selectedRating, setSelectedRating] = useState(0); // ⭐ state to store selected rating
  const [showRatingOptions, setShowRatingOptions] = useState(false);

  const handleAddToWatchlist = () => {
    const movieData = {
      title,
      posterUrl: posterSrc,
      rating,
      year,
      type,
      watched: false,
    };

    if (!watchlist.some((movie) => movie.title === title)) {
      setWatchlist([...watchlist, movieData]);
      alert("Added to Watchlist! ✅");
    } else {
      alert("Already in Watchlist! ⚠️");
    }
  };

  const submitRating = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/ratings",
        {
          movieTitle: title,
          rating: selectedRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert("Rating submitted! ✅");
      setShowRatingOptions(false);
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error.message);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="flex flex-col p-2 rounded-lg bg-neutral-700 bg-opacity-10 w-[160px] sm:w-[200px] md:w-[220px] lg:w-[250px]">
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
        <button
          onClick={() => setShowRatingOptions(!showRatingOptions)}
          className="text-yellow-400"
        >
          <RatingIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {showRatingOptions && (
        <div className="flex space-x-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedRating(star)}
              className={`text-xl ${selectedRating >= star ? "text-yellow-400" : "text-gray-400"}`}
            >
              ⭐
            </button>
          ))}
          <button
            onClick={submitRating}
            className="ml-2 px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}

      <button
        onClick={handleAddToWatchlist}
        className="mt-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-all"
      >
        + Add to Watchlist
      </button>
    </div>
  );
};

export default MovieCard;
