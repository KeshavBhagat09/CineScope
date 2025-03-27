import React, { useState } from "react";
import MovieCard from "./MovieCard"; // Import MovieCard component
import TopPicksCard from "../Data/VideoData"; // Import movie data
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for navigation
import WhattoWatch from "../../assets/WhattoWatch.png"; // Import the background image

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
    <div className="relative w-full flex flex-col items-start px-4 mt-12">
      {/* Background Image behind 'Top Picks' */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[900px] sm:w-[1000px] md:w-[1100px] lg:w-[1200px] opacity-30 z-0">
        <img src={WhattoWatch} alt="What to Watch" className="w-full" />
      </div>
  
      {/* Title & Description */}
      <h2 className="relative text-3xl font-bold text-stone-300 mb-4 z-10">
        Top Picks
      </h2>
      <p className="relative text-neutral-500 mb-6 z-10">
        TV shows and movies just for you
      </p>
  
      {/* Movie Cards Section */}
      <div className="relative w-full flex items-center mb-40">
        {/* Back Button (Hidden if at start) */}
        {startIndex > 0 && (
          <button
            onClick={handleBack}
            className="absolute left-0 bg-black/50 p-2 rounded-full shadow-md z-10 hover:bg-black/70"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
        )}
  
        {/* Movie Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full z-10">
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
}

export default TopPicks;