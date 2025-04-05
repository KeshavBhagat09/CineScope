import React from "react";
import { useOutletContext } from "react-router-dom";
import RatingIcon from "../../assets/RatingIcon"; // Ensure this is available

const Watchlist = () => {
  const { watchlist, setWatchlist, token } = useOutletContext();

  const addToWatchlist = async (movie) => {
    if (!movie._id) {
      console.error("❌ No _id found in movie");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/watchlist/add",
        { productId: movie._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("✅ Watchlist updated:", response.data);
      setWatchlist((prev) => [...prev, movie]);
    } catch (error) {
      console.error("❌ Failed to add:", error.response?.data?.message || error.message);
    }
  };

  const handleRemove = (title) => {
    setWatchlist(watchlist.filter((movie) => movie.title !== title));
  };

  return (
    <div className="relative w-full flex flex-col items-start px-4 sm:px-6 md:px-8 lg:px-10 mt-12 min-h-screen">
      {/* Title */}
      <h2 className="relative text-2xl sm:text-3xl font-bold text-stone-300 mb-4 z-10">
        Your Watchlist
      </h2>
      <p className="relative text-neutral-500 mb-6 text-sm sm:text-base z-10">
        Movies you saved to watch later
      </p>

      {/* Watchlist Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full z-10 mb-40">
        {watchlist.length > 0 ? (
          watchlist.map((movie, index) => (
            <div
              key={index}
              className="flex flex-col p-2 rounded-lg bg-neutral-700 bg-opacity-10 w-full max-w-[160px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] mx-auto"
            >
              <img
                loading="lazy"
                src={movie.posterUrl}
                alt={`Movie poster for ${movie.title}`}
                className="rounded-md w-full h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] object-cover"
              />
              <div className="mt-2 text-base sm:text-lg font-semibold text-stone-300 truncate">
                {movie.title}
              </div>

              <div className="flex items-center justify-between mt-1 text-xs sm:text-sm text-stone-300">
                <span>⭐ {movie.rating || "N/A"}</span>
                <RatingIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  onClick={() => handleRemove(movie.title)}
                  className="w-full sm:w-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs sm:text-sm transition-all"
                >
                  Remove
                </button>
                <button
                  onClick={() => addToWatchlist(movie)}
                  className="w-full sm:w-auto px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-xs sm:text-sm transition-all"
                >
                  Add to DB
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm sm:text-base col-span-full text-center">
            Your watchlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;