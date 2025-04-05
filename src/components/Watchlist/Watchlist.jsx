import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Watchlist = () => {
  const { watchlist, setWatchlist, token } = useOutletContext();

  console.log("📋 Watchlist contents:", watchlist);

  const addToWatchlist = async (movie) => {
    console.log("🎯 Adding to DB:", movie);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/watchlist/add",
        {
          title: movie.title,
          posterUrl: movie.posterUrl,
          rating: movie.rating,
          year: movie.year,
          type: movie.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Watchlist updated:", response.data);

      // Update frontend watchlist, avoiding duplicates
      setWatchlist((prev) => {
        if (!prev.some((item) => item.title === movie.title)) {
          return [...prev, movie];
        }
        return prev;
      });
    } catch (error) {
      console.error(
        "❌ Failed to add to watchlist:",
        error.response?.data?.message || error.message
      );
    }
  };

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
    } catch (error) {
      console.error(
        "❌ Failed to remove from watchlist:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-white mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div
              key={item.title} // Use title as key since no _id
              className="bg-gray-900 rounded-lg p-3"
            >
              <img
                src={item.posterUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <button
                onClick={() => handleRemove(item.title)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded mt-2"
              >
                Remove
              </button>
              <button
                onClick={() => addToWatchlist(item)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded mt-2 ml-2"
              >
                Add to DB
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;