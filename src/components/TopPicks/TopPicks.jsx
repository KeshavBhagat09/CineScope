import React from "react";
import MovieCard from "./MovieCard"; // Import MovieCard component
import TopPicksCard from "../Data/VideoData"; // Import movie data

const TopPicks = () => {
  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="text-3xl font-bold text-stone-300 mb-4">Top Picks</h2>
      <p className="text-neutral-500 mb-6">TV shows and movies just for you</p>

      {/* Render Movie Cards */}
      <div className="flex flex-wrap gap-4 justify-center">
        {TopPicksCard.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default TopPicks;
