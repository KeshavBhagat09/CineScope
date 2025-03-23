import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { FeaturedMovies as FeaturedData } from "../Data/VideoData";
import { VideoData } from "../Data/VideoData";
import FeaturedMovieCard from "./FeaturedMovieCard";
import { FeaturedMovieCard as FeaturedMovieCardData } from "../Data/VideoData";
import TopPicks from "../TopPicks/TopPicks";
import StreamingNow from "../StreamingNow/StreamingNow";
import Watchlist from "../Watchlist/Watchlist";

const FeaturedMovies = () => {
  // State to track the currently featured video index
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  // State to manage the background gradient
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(to bottom, #1a1a1a, #000)"
  );

  // State to synchronize side videos with the featured video
  const [syncedVideoData, setSyncedVideoData] = useState(VideoData);

  // Automatically change the featured video every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % FeaturedData.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Update the side section videos when the featured video index changes
  useEffect(() => {
    const rotateVideos = () => {
      const videosCopy = [...VideoData]; // Create a copy of VideoData
      const rotatedVideos = [
        ...videosCopy.slice(currentFeaturedIndex % videosCopy.length),
        ...videosCopy.slice(0, currentFeaturedIndex % videosCopy.length),
      ];
      setSyncedVideoData(rotatedVideos); // Update the synchronized video data
    };

    rotateVideos();
  }, [currentFeaturedIndex]);

  // Extract the dominant color from the current featured video's image
  useEffect(() => {
    const extractColorFromImage = (imageSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const pixels = imageData.data;

          let r = 0, g = 0, b = 0, count = 0;

          // Calculate the average color
          for (let i = 0; i < pixels.length; i += 4 * 100) {
            r += pixels[i];
            g += pixels[i + 1];
            b += pixels[i + 2];
            count++;
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
          resolve(hexColor);
        };

        img.onerror = () => reject("Failed to load image.");
      });
    };

    const updateGradient = async () => {
      if (!FeaturedData[currentFeaturedIndex]?.image) return;

      try {
        const dominantColor = await extractColorFromImage(FeaturedData[currentFeaturedIndex].image);
        setBackgroundGradient(`linear-gradient(to bottom, ${dominantColor}, #000)`);
      } catch (error) {
        console.error("Error extracting color:", error);
        setBackgroundGradient("linear-gradient(to bottom, #1a1a1a, #000)");
      }
    };

    updateGradient();
  }, [currentFeaturedIndex]);

  // Handle cases where there are no featured videos
  if (!FeaturedData || FeaturedData.length === 0) {
    return <div className="text-white p-8">No featured videos available</div>;
  }

  // Get the current featured video data
  const currentFeaturedVideo = FeaturedData[currentFeaturedIndex];

  // Navigate to the next featured video
  const handleNext = () => {
    setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % FeaturedData.length);
  };

  // Navigate to the previous featured video
  const handlePrev = () => {
    setCurrentFeaturedIndex(
      (prevIndex) => (prevIndex - 1 + FeaturedData.length) % FeaturedData.length
    );
  };

  return (
    <div
      className="min-h-screen p-8 transition-all duration-500 relative"
      style={{ background: backgroundGradient }}
    >
      <div className="flex gap-5 max-md:flex-col">
        {/* Main Featured Video Section */}
        <div className="relative flex flex-col w-[74%] max-md:w-full">
          <div className="relative group cursor-pointer overflow-hidden rounded-xl">
            <img
              loading="lazy"
              src={currentFeaturedVideo.image || "/placeholder.svg"}
              alt={currentFeaturedVideo.title}
              className="object-contain grow w-full rounded-xl aspect-[1.39] max-md:mt-10 max-md:max-w-full transition-transform duration-300 -mt-9"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all"
          >
            ❯
          </button>

          {/* Featured Movie Card */}
          <div className="absolute bottom-5 left-5">
            <FeaturedMovieCard video={FeaturedMovieCardData[currentFeaturedIndex]} />
          </div>
        </div>

        {/* Side Section with Synchronized Videos */}
        <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-8">
            <div className="flex gap-5 justify-between w-full mb-6">
              <div className="gap-2 self-stretch my-auto text-lg text-white font-semibold">
                Featured Videos
              </div>
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
            <div className="space-y-4 max-h-[calc(100vh-200px)]">
              {/* Render synchronized video data */}
              {syncedVideoData.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-12">
        <TopPicks />
        <StreamingNow />
        <Watchlist />
      </div>
    </div>
  );
};

export default FeaturedMovies;