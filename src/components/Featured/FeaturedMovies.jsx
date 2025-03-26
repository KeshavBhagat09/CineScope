import { useState, useEffect, useRef } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import FeaturedMovieCard from "./FeaturedMovieCard";
import TopPicks from "../TopPicks/TopPicks";
import StreamingNow from "../StreamingNow/StreamingNow";
import Watchlist from "../Watchlist/Watchlist";
import { FeaturedMovies as FeaturedData } from "../Data/VideoData";
import { VideoData } from "../Data/VideoData.js"

const FeaturedMovies = ({ sectionTitle = "trailer" }) => {
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(to bottom, #1a1a1a, #000)"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const nextVideoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:8000/api/v1/videos",
          {
            params: { title: sectionTitle, page: 1, limit: 3 }, // Limit set to 3
          }
        );
        console.log("API Response:", response.data);
        const videos = response.data.data || [];
        if (videos.length === 0) {
          throw new Error("No videos returned from API");
        }
        setFeaturedVideos(videos);
      } catch (err) {
        console.error("Error fetching featured videos:", err);
        setError("Failed to load videos. Please try again later.");
        setFeaturedVideos([]); // Reset to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [sectionTitle]);

  useEffect(() => {
    if (featuredVideos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFeaturedIndex(
        (prevIndex) => (prevIndex + 1) % featuredVideos.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredVideos]);

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
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let i = 0; i < pixels.length; i += 4 * 100) {
            r += pixels[i];
            g += pixels[i + 1];
            b += pixels[i + 2];
            count++;
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          resolve(
            `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
          );
        };

        img.onerror = () => reject("Failed to load image.");
      });
    };

    if (featuredVideos[currentFeaturedIndex]?.image) {
      extractColorFromImage(featuredVideos[currentFeaturedIndex].image)
        .then((color) =>
          setBackgroundGradient(`linear-gradient(to bottom, ${color}, #000)`)
        )
        .catch(() =>
          setBackgroundGradient("linear-gradient(to bottom, #1a1a1a, #000)")
        );
    }
  }, [currentFeaturedIndex, featuredVideos]);

  // Ensure the video plays when the index changes
  useEffect(() => {
    if (nextVideoRef.current && featuredVideos[currentFeaturedIndex]?.videoUrl) {
      nextVideoRef.current.load(); // Reload the video source
      nextVideoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  }, [currentFeaturedIndex, featuredVideos]);

  if (isLoading) return <div className="text-white p-8">Loading videos...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!featuredVideos.length)
    return <div className="text-white p-8">No featured videos available</div>;

  return (
    <div
      className="min-h-screen p-8 transition-all duration-500 relative"
      style={{ background: backgroundGradient }}
    >
      <div className="flex gap-5 max-md:flex-col">
        <div className="relative flex flex-col w-[74%] max-md:w-full">
          <div className="relative group cursor-pointer overflow-hidden rounded-xl">
            <video
              src={
                featuredVideos[currentFeaturedIndex]?.videoUrl ||
                
                "/placeholder.mp4"
              }
              ref={nextVideoRef}
              loop
              muted
              autoPlay
              className="object-contain grow w-full rounded-xl aspect-[1.39] max-md:mt-10 max-md:max-w-full transition-transform duration-300 -mt-9"
            />
          </div>
          <button
            onClick={() =>
              setCurrentFeaturedIndex(
                (prev) =>
                  (prev - 1 + featuredVideos.length) % featuredVideos.length
              )
            }
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setCurrentFeaturedIndex(
                (prev) => (prev + 1) % featuredVideos.length
              )
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all"
          >
            ❯
          </button>
          <div className="absolute bottom-5 left-5">
            <FeaturedMovieCard video={featuredVideos[currentFeaturedIndex]} />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-8">
            <div className="flex gap-5 justify-between w-full mb-6">
              <div className="gap-2 self-stretch my-auto text-lg text-white font-semibold">
                Featured Videos
              </div>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-200px)]">
              {VideoData.map((video) => (
                <VideoCard key={video.id} {...video} /> //side section images
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <TopPicks />
        <StreamingNow />
        <Watchlist />
      </div>
    </div>
  );
};

export default FeaturedMovies;