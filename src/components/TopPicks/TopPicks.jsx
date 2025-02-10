import React from "react";
import TopPicksHeader from "./TopPicksHeader";
import TopPicksIcon from "./TopPicksIcon";

function TopPicks() {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <TopPicksHeader />
      <TopPicksIcon />
    </div>
  );
}

export default TopPicks;