import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import RatingIcon from "../assets/RatingIcon";

const WatchlistPage = () => {
  const { watchlist, setWatchlist, token } = useOutletContext();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showRatingOptions, setShowRatingOptions] = useState({});
  const [reviewText, setReviewText] = useState("");

  const handleRemove = async (title) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/watchlist/remove",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setWatchlist(watchlist.filter((movie) => movie.title !== title));
      alert("Removed from Watchlist! ✅");
    } catch (error) {
      console.error(
        "❌ Failed to remove from watchlist:",
        error.response?.data?.message || error.message
      );
      alert("Failed to remove from Watchlist.");
    }
  };

  const submitRating = async (title) => {
    const authToken = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/api/v1/ratings",
        {
          movieTitle: title,
          rating: selectedRating,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Rating submitted! ✅");
      setShowRatingOptions({});
      setSelectedRating(0);
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error.message);
      alert("Failed to submit rating.");
    }
  };

  const submitReview = async () => {
    const authToken = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/api/v1/reviews/review",
        {
          content: reviewText,
          movieTitle: selectedMovie?.title,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Review submitted! ✅");
      setReviewText("");
      setSelectedMovie(null);
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit review: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-b from-black to-neutral-900 text-white">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">Your Watchlist</h1>

      {/* Subtitle */}
      <p className="text-neutral-500 mb-6 text-center">
        All your saved movies and shows in one place
      </p>

      {/* Grid of Movie Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <motion.div
              key={item.title}
              className="flex flex-col p-2 rounded-2xl bg-neutral-800/30 shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform w-full"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedMovie(item)}
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="rounded-xl w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] object-cover"
                />
                <h3 className="mt-2 text-lg font-semibold text-stone-300 truncate">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-1 text-sm text-stone-300">
                <span>⭐ {item.rating}</span>
                <button
                  onClick={() =>
                    setShowRatingOptions((prev) => ({
                      ...prev,
                      [item.title]: !prev[item.title],
                    }))
                  }
                  className="text-yellow-400"
                >
                  <RatingIcon className="w-6 h-6 text-white" />
                </button>
              </div>
              {showRatingOptions[item.title] && (
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
                    onClick={() => submitRating(item.title)}
                    className="ml-2 px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded"
                  >
                    Submit
                  </button>
                </div>
              )}
              <button
                onClick={() => handleRemove(item.title)}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-all"
              >
                Remove
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            Your watchlist is empty.
          </p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 overflow-y-auto pt-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-neutral-900 w-full max-w-3xl mx-4 my-8 rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="relative">
                <img
                  src={selectedMovie.posterUrl}
                  className="w-full h-64 sm:h-80 object-cover"
                  alt={`Movie poster for ${selectedMovie.title}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-4 right-4 text-white hover:text-red-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
                <div className="flex items-center text-sm text-neutral-400 mb-4">
                  <span>{selectedMovie.year}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedMovie.runtime}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedMovie.genre}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">⭐ {selectedMovie.rating}</span>
                  <span className="ml-4 text-neutral-400">{selectedMovie.type}</span>
                </div>
                <p className="text-neutral-300 mb-4">{selectedMovie.plot}</p>
                <p className="text-neutral-400 mb-4">
                  <strong>Actors:</strong> {selectedMovie.actors}
                </p>
                <div className="border-t border-neutral-700 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:border-red-600"
                    rows="4"
                    placeholder="Share your thoughts about the movie..."
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchlistPage;