import React from "react";

function TopPicksHeader() {
  return (
    <div className="flex items-center self-stretch my-auto">
      <div className="flex flex-col justify-center self-stretch my-auto">
        <div className="flex gap-2.5 items-center self-start text-3xl text-stone-300">
          <div className="self-stretch my-auto">Top Picks</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f36444c5c70e7ddd70a3ed2fc5e576d9c96c869533db9392765c1b3c37d1a9d5?apiKey=3953249e405f4f0f9fc1a18498c625c2&"
            className="object-contain shrink-0 self-stretch my-auto w-7 aspect-[0.97]"
            alt=""
          />
        </div>
        <div className="mt-1.5 text-base leading-7 text-neutral-500">
          TV shows and movies just for you
        </div>
      </div>
    </div>
  );
}

export default TopPicksHeader;