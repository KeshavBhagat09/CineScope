import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import RatingIcon from "../assets/RatingIcon";

const ShowItem = ({ title, posterSrc, rating, year, type, plot, actors, genre, runtime }) => {
  const { watchlist, setWatchlist } = useOutletContext();
  const [selectedRating, setSelectedRating] = useState(0);
  const [showRatingOptions, setShowRatingOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleAddToWatchlist = () => {
    const showData = {
      title,
      posterUrl: posterSrc,
      rating,
      year,
      type,
      watched: false,
    };

    if (!watchlist.some((item) => item.title === title)) {
      setWatchlist([...watchlist, showData]);
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
      alert("Failed to submit rating: " + (error.response?.data?.message || error.message));
    }
  };

  const submitReview = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/reviews/review",
        {
          content: reviewText,
          movieTitle: title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Review submitted! ✅");
      setReviewText("");
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit review: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center p-4 bg-neutral-700 bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all cursor-pointer"
      >
        <img
          loading="lazy"
          src={posterSrc}
          className="w-24 h-16 rounded-md object-cover mr-4"
          alt={`Show poster for ${title}`}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-stone-300 truncate">{title}</h3>
          <div className="flex items-center text-sm text-neutral-400 mt-1">
            <span>{year}</span>
            <span className="mx-2">•</span>
            <span>{genre}</span>
          </div>
          <div className="flex items-center text-sm text-stone-300 mt-1">
            <span>⭐ {rating}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowRatingOptions(!showRatingOptions);
            }}
            className="text-yellow-400"
          >
            <RatingIcon className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWatchlist();
            }}
            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-all"
          >
            + Watchlist
          </button>
        </div>
      </div>

      {showRatingOptions && (
        <div className="flex space-x-1 p-4 bg-neutral-700 bg-opacity-10 rounded-lg mt-2 ml-28">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRating(star);
              }}
              className={`text-xl ${selectedRating >= star ? "text-yellow-400" : "text-gray-400"}`}
            >
              ⭐
            </button>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              submitRating();
            }}
            className="ml-2 px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 overflow-y-auto">
          <div className="bg-neutral-900 w-full max-w-3xl mx-4 my-8 rounded-lg overflow-hidden shadow-2xl">
            <div className="relative">
              <img
                src={posterSrc}
                className="w-full h-64 sm:h-80 object-cover"
                alt={`Show poster for ${title}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white hover:text-red-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <div className="flex items-center text-sm text-neutral-400 mb-4">
                <span>{year}</span>
                <span className="mx-2">•</span>
                <span>{runtime}</span>
                <span className="mx-2">•</span>
                <span>{genre}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">⭐ {rating}</span>
                <span className="ml-4 text-neutral-400">{type}</span>
              </div>
              <p className="text-neutral-300 mb-4">{plot}</p>
              <p className="text-neutral-400 mb-4">
                <strong>Actors:</strong> {actors}
              </p>
              <div className="border-t border-neutral-700 pt-4">
                <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-3 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:border-red-600"
                  rows="4"
                  placeholder="Share your thoughts about the show..."
                />
                <button
                  onClick={submitReview}
                  className="mt-3 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
                  disabled={!reviewText.trim()}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowItem;