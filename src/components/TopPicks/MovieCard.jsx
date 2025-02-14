import React from "react";
import RatingIcon from "../../assets/RatingIcon"; // Import SVG as a component

const MovieCard = ({ title, posterSrc, rating }) => {
  return (
    <div className="flex flex-col p-2 rounded-lg bg-neutral-700 bg-opacity-10 w-[250px]"> 
      <img
        loading="lazy"
        src={posterSrc}
        className="rounded-md w-full h-[340px] object-cover"
        alt={`Movie poster for ${title}`}
      />
      <div className="mt-2 text-lg font-semibold text-stone-300 truncate">
        {title}
      </div>

      {/* Rating + Icon */}
      <div className="flex items-center justify-between mt-1 text-sm text-stone-300">
        <span>⭐ {rating}</span>
        <RatingIcon className="w-6 h-6 text-white" /> 
      </div>
    </div>
  );
};

export default MovieCard;
