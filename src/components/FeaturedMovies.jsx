import { useState, useEffect } from "react"
import VideoCard from "./VideoCard"
import { FeaturedMovies as FeaturedData } from "./VideoData"
import { VideoData } from "./VideoData"
import FeaturedMovieCard from "./FeaturedMovieCard"
import { FeaturedMovieCard as FeaturedMovieCardData } from "./VideoData"

const FeaturedMovies = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)

  // Automatically change the featured video every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % FeaturedData.length)
    }, 5000)

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

  if (!FeaturedData || FeaturedData.length === 0) {
    return <div>No featured videos available</div>
  }

  const currentFeaturedVideo = FeaturedData[currentFeaturedIndex]

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-8">
      <div className="flex gap-5 max-md:flex-col">
        {/* Featured Video Section */}
        <div className="relative flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
          <div className="relative group cursor-pointer overflow-hidden rounded-xl">
            <img
              loading="lazy"
              src={currentFeaturedVideo.image || "/placeholder.svg"}
              alt={currentFeaturedVideo.title}
              className="object-contain grow mt-1.5 w-full rounded-xl aspect-[1.39] max-md:mt-10 max-md:max-w-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Featured Movie Card */}
          <div className="absolute bottom-5 left-5">
            <FeaturedMovieCard video={FeaturedMovieCardData[currentFeaturedIndex]} />
          </div>
        </div>

        {/* Side Section for Other Videos */}
        <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-8">
            <div className="flex gap-5 justify-between w-full mb-6">
              <div className="gap-2 self-stretch my-auto text-lg text-white font-semibold">Featured Videos</div>
              <button
                className="flex gap-2.5 items-center px-5 py-2 text-base leading-7 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 min-h-[42px] text-stone-300"
                aria-label="Browse all trailers"
              >
                <span className="self-stretch my-auto">Browse Trailers</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/01a1ffdf5e4835fe6ea08903df43017c6a34db607bc5a25a717a5bf79630535b?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
              </button>
            </div>
            <div className="space-y-4  max-h-[calc(100vh-200px)]">
              {VideoData.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedMovies

