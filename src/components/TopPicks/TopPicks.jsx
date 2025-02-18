import React, { useState } from "react";
import MovieCard from "./MovieCard"; // Import MovieCard component
import TopPicksCard from "../Data/VideoData"; // Import movie data
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for navigation

const TopPicks = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 6; // Number of cards visible at a time

  // Calculate the end index for slicing
  const endIndex = startIndex + visibleCards;
  const totalMovies = TopPicksCard.length;

  // Handle Next
  const handleNext = () => {
    if (endIndex < totalMovies) {
      setStartIndex(startIndex + visibleCards);
    }
  };

  // Handle Back
  const handleBack = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - visibleCards);
    }
  };

  return (
    <div className="w-full flex flex-col items-start px-4 relative">
      <h2 className="text-3xl font-bold text-stone-300 mb-4">Top Picks</h2>
      <p className="text-neutral-500 mb-6">TV shows and movies just for you</p>

      {/* Movie Cards Section */}
      <div className="relative w-full flex items-center">
        {/* Back Button (Hidden if at start) */}
        {startIndex > 0 && (
          <button
            onClick={handleBack}
            className="absolute left-0 bg-black/50 p-2 rounded-full shadow-md z-10 hover:bg-black/70"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
        )}

        {/* Movie Cards - Full Width */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full">
          {TopPicksCard.slice(startIndex, endIndex).map((movie, index) => (
            <MovieCard key={index} {...movie} />
          ))}
        </div>

        {/* Next Button (Hidden if at last set of movies) */}
        {endIndex < totalMovies && (
          <button
            onClick={handleNext}
            className="absolute right-0 bg-black/50 p-2 rounded-full shadow-md z-10 hover:bg-black/70"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopPicks;