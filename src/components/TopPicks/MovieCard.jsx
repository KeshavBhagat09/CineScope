import React from "react";

const MovieCard = ({ title, posterSrc, rating }) => {
  return (
    <div className="flex flex-col p-2 rounded-lg bg-neutral-700 bg-opacity-10 w-[180px]">
      <img
        loading="lazy"
        src={posterSrc}
        className="rounded-md w-full h-[240px] object-cover"
        alt={`Movie poster for ${title}`}
      />
      <div className="mt-2 text-lg font-semibold text-stone-300 truncate">
        {title}
      </div>
      <div className="flex items-center gap-1 mt-1 text-sm text-stone-300">
        ⭐ {rating}
      </div>
    </div>
  );
};

export default MovieCard;
