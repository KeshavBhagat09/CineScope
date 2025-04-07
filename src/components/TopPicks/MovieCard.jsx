import React from "react";
import { useOutletContext } from "react-router-dom"; // Access watchlist state
import RatingIcon from "../../assets/RatingIcon"; 

const MovieCard = ({ title, posterSrc, rating, year, type }) => {
  const { watchlist, setWatchlist } = useOutletContext(); // Get state from Root.jsx

  const handleAddToWatchlist = () => {
    const movieData = { title, posterUrl: posterSrc, rating, year, type, watched: false };

    // Prevent duplicates
    if (!watchlist.some(movie => movie.title === title)) {
      setWatchlist([...watchlist, movieData]);
      alert("Added to Watchlist! ✅");
    } else {
      alert("Already in Watchlist! ⚠️");
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
        <RatingIcon className="w-6 h-6 text-white" />
      </div>

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
