import React from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Watchlist = () => {
  const { watchlist, setWatchlist, token } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isFullPage = location.pathname === "/watchlist"; // true if on the watchlist page

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

  // Show only 6 cards in preview mode, all in full view
  const displayList = isFullPage ? watchlist : watchlist.slice(0, 6);

  return (
    <div className="relative w-full flex flex-col items-start px-4 mt-12">
  {/* Top Header with Button */}
  <div className="w-full flex justify-between items-center mb-4">
    <h2 className="text-3xl font-bold text-stone-300">Your Watchlist</h2>
    {!isFullPage && watchlist.length > 6 && (
      <button
        onClick={() => navigate("/watchlist")}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all text-sm"
      >
        Show full watchlist →
      </button>
    )}
  </div>

  {/* Subtitle */}
  <p className="text-neutral-500 mb-6">
    Movies and shows you've saved
  </p>

  {/* Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full mb-8">
    {displayList.length > 0 ? (
      displayList.map((item) => (
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
