import React, { useState } from "react";
import MovieCard from "../../components/TopPicks/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Avenger from "../../assets/Avenger.jpeg";
import Boys from "../../assets/Boys.jpeg";
import Loki from "../../assets/Loki.jpeg";
import Reacher from "../../assets/Reacher.jpeg";
import Strangers from "../../assets/Strangers.jpeg";
import TheLastOfUs from "../../assets/TheLastOfUs.jpeg";
import inside from "../../assets/inside.jpg";
import BreakingBad from "../../assets/BreakingBad.jpg";
import Dark from "../../assets/Dark.jpeg";
import GameOfThrones2 from "../../assets/GameOfThrones2.jpg";
import StreamingNow from "../../assets/StreamingNow.png";
import PaatalLok from "../../assets/PaatalLok.jpeg";
import DarkKnight from "../../assets/DarkKnight.jpeg";
import Social from "../../assets/SocialNetwork.jpeg";

// Dummy data for different platforms
const moviesByPlatform = {
  "Prime Video": [
    { title: "Paatal Lok", rating: "8.9", posterSrc: PaatalLok },
    { title: "The Boys", rating: "7.5", posterSrc: Boys },
    { title: "Reacher", rating: "8.0", posterSrc: Reacher },
    { title: "The Last of Us", rating: "8.9", posterSrc: DarkKnight },
    { title: "The Boys", rating: "7.5", posterSrc: Boys },
    { title: "Reacher", rating: "8.0", posterSrc: Social },
  ],
  "Disney+": [
    { title: "Avengers", rating: "9.0", posterSrc: Avenger },
    { title: "Loki", rating: "8.2", posterSrc: Loki },
    { title: "Inside out 2", rating: "7.9", posterSrc: inside },
    { title: "Avengers", rating: "9.0", posterSrc: Avenger },
    { title: "Loki", rating: "8.2", posterSrc: Loki },
    { title: "Inside out 2", rating: "7.9", posterSrc: inside },
  ],
  Netflix: [
    { title: "Breaking Bad", rating: "8.7", posterSrc: BreakingBad },
    { title: "Dark", rating: "7.3", posterSrc: Dark },
    { title: "Stranger things", rating: "8.1", posterSrc: Strangers },
    { title: "Breaking Bad", rating: "8.7", posterSrc: BreakingBad },
    { title: "Dark", rating: "7.3", posterSrc: Dark },
    { title: "Stranger things", rating: "8.1", posterSrc: Strangers },
  ],
  "HBO Max": [
    { title: "Game of Thrones", rating: "9.3", posterSrc: GameOfThrones2 },
    { title: "The Last of Us", rating: "8.9", posterSrc: TheLastOfUs },
    { title: "Game of Thrones", rating: "9.3", posterSrc: GameOfThrones2 },
    { title: "The Last of Us", rating: "8.9", posterSrc: TheLastOfUs },{ title: "Game of Thrones", rating: "9.3", posterSrc: GameOfThrones2 },
    { title: "The Last of Us", rating: "8.9", posterSrc: TheLastOfUs },
    { title: "Game of Thrones", rating: "9.3", posterSrc: GameOfThrones2 },
  ],
};

const TopPicks = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("Prime Video");
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 6; // Number of movies visible at a time

  const currentMovies = moviesByPlatform[selectedPlatform] || [];
  const endIndex = startIndex + visibleCards;
  const totalMovies = currentMovies.length;

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
    <div className="relative w-full flex flex-col items-start px-4 mb-12">
      {/* Background Image */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[900px] sm:w-[1000px] md:w-[1100px] lg:w-[1200px] opacity-30 z-0">
        <img src={StreamingNow} alt="What to Watch" className="w-full" />
      </div>

      {/* Navigation Bar */}
      <div className="relative flex space-x-4 mb-10 z-10">
        {Object.keys(moviesByPlatform).map((platform) => (
          <button
            key={platform}
            onClick={() => {
              setSelectedPlatform(platform);
              setStartIndex(0);
            }}
            className={`px-4 py-2 rounded-lg transition ${
              selectedPlatform === platform
                ? "bg-yellow-500 text-black font-bold"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Movie Cards Section */}
      <div className="relative w-full flex items-center z-10">
        {/* Back Button (Hidden if at start) */}
        {startIndex > 0 && (
          <button
            onClick={handleBack}
            className="absolute left-0 bg-black/50 p-2 rounded-full shadow-md z-10 hover:bg-black/70"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
        )}

        {/* Movie Cards - Horizontal Scroll */}
        <div className="flex space-x-10 overflow-hidden w-full z-10">
          {currentMovies.slice(startIndex, endIndex).map((movie, index) => (
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
