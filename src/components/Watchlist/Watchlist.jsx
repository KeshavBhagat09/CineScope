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
      <h2 className="text-xl font-bold text-stone-300 mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div
              key={item.title} // Use title as key since no _id
              className="flex flex-col p-2 rounded-lg bg-neutral-700 bg-opacity-10 w-[160px] sm:w-[200px] md:w-[220px] lg:w-[250px]"
            >
              <img
                src={item.posterUrl}
                alt={item.title}
                className="rounded-md w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold text-stone-300 truncate">{item.title}</h3>
              <button
                onClick={() => handleRemove(item.title)}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-all"
              >
                Remove
              </button>
              <button
                onClick={() => addToWatchlist(item)}
                className="mt-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-all"
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