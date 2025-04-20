import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Watchlist = () => {
  const { watchlist, setWatchlist, token } = useOutletContext();

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
    <div className="relative w-full flex flex-col items-start px-4 mt-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-stone-300 mb-4">Your Watchlist</h2>
      <p className="text-neutral-500 mb-6">Movies and shows you've saved</p>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full mb-40">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div
              key={item.title}
              className="flex flex-col p-2 rounded-2xl bg-neutral-800/30 shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform w-full"
            >
              <img
                src={item.posterUrl}
                alt={item.title}
                className="rounded-xl w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold text-stone-300 truncate">
                {item.title}
              </h3>
              <button
                onClick={() => handleRemove(item.title)}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-all"
              >
                Remove
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
