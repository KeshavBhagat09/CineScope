import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TopPicks from "../TopPicks/TopPicks";
import StreamingNow from "../StreamingNow/StreamingNow";
import Watchlist from "../Watchlist/Watchlist";
import { VideoData } from "../Data/VideoData.js"; // Import VideoData for images

const FeaturedMovies = ({ sectionTitle = "trailer" }) => {
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(to bottom, #1a1a1a, #000)"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const customFeaturedImages = [
    "../src/assets/BreakingBad.jpg",
    "../src/assets/GameOfThrones.jpg",
    "../src/assets/Avengers2.jpg",
    "../src/assets/KungFuPanda.jpeg",
    "../src/assets/interstellar2.jpeg",
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:8000/api/v1/videos",
          {
            params: {
              title: sectionTitle,
              page: 1,
              limit: 10,
              sort: "createdAt",
            },
          }
        );

        let videos = response.data.data || [];
        if (videos.length === 0) throw new Error("No videos returned from API");

        videos.sort((a, b) => a.title.localeCompare(b.title));
        setFeaturedVideos(videos);

        const startIndex = videos.findIndex((video) =>
          video.title.toLowerCase().includes("trailer1")
        );
        setCurrentFeaturedIndex(startIndex !== -1 ? startIndex : 0);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
        setFeaturedVideos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [sectionTitle]);

  useEffect(() => {
    setVideoEnded(false);
  }, [currentFeaturedIndex]);

  useEffect(() => {
    if (videoRef.current) {
      const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => {
          setCurrentFeaturedIndex((prev) => (prev + 1) % featuredVideos.length);
        }, 4000);
      };

      const videoEl = videoRef.current;
      videoEl.addEventListener("ended", handleVideoEnd);
      return () => {
        videoEl.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [featuredVideos, currentFeaturedIndex]);

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

    const videoDataMatch = VideoData[currentFeaturedIndex % VideoData.length];
    if (videoDataMatch?.image) {
      extractColorFromImage(videoDataMatch.image)
        .then((color) =>
          setBackgroundGradient(`linear-gradient(to bottom, ${color}, #000)`)
        )
        .catch(() =>
          setBackgroundGradient("linear-gradient(to bottom, #1a1a1a, #000)")
        );
    }
  }, [currentFeaturedIndex]);

  if (isLoading) return <div className="text-white p-8">Loading videos...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!featuredVideos.length)
    return <div className="text-white p-8">No featured videos available</div>;

  const getVideoWithImage = (apiVideo, index) => {
    return {
      ...apiVideo,
      image: customFeaturedImages[index % customFeaturedImages.length],
      poster: customFeaturedImages[index % customFeaturedImages.length],
    };
  };

  const currentVideo = getVideoWithImage(
    featuredVideos[currentFeaturedIndex],
    currentFeaturedIndex
  );

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredVideos.length);
    setVideoEnded(false);
  };

  const handlePrev = () => {
    setCurrentFeaturedIndex(
      (prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length
    );
    setVideoEnded(false);
  };

  return (
    <div
      className="min-h-screen transition-all duration-500 relative"
      style={{ background: backgroundGradient }}
    >
      {/* Featured Movie Section */}
      <div className="relative w-full h-[92vh] md:h-[95vh] flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          {videoEnded ? (
            <img
              src={currentVideo?.image || "/placeholder.jpg"}
              alt={currentVideo?.title || "Featured Movie"}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={currentVideo?.videoUrl || "/placeholder.mp4"}
              ref={videoRef}
              autoPlay
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* 🔧 Mute/Unmute Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={toggleMute}
            className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/80 transition"
          >
            {isMuted ? "Unmute 🔊" : "Mute 🔇"}
          </button>
        </div>

        {/* ◀️ Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 hover:scale-105 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* ▶️ Next Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 hover:scale-105 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* Movie Details Overlay */}
        <div className="relative z-10 p-8 md:p-12 max-w-2xl text-white">
          <span className="text-blue-400 font-semibold">CiNESCOPE</span>
          <h1
            className="text-6xl font-bold mb-2 mt-2"
            style={{ color: "#ff0000" }}
          >
            {currentVideo?.title.toUpperCase() || "MOVIE TITLE"}
          </h1>
          <div className="text-sm mb-2">
            Hindi | Tamil | Telugu | Malayalam | Kannada
          </div>
          <div className="text-green-400 mb-4">NEW ORIGINAL SERIES</div>
          <p className="text-gray-300 mb-6 line-clamp-3">
            {currentVideo?.description ||
              "Seok, an eager yet genius neurosurgeon is reunited with Deokhee, the professor who ruined her long ago..."}
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4l10 6-10 6V4z" />
              </svg>
              <span>Watch now</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M4 8a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12A6 6 0 0010 2z" />
              </svg>
              <span>More info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="p-8">
        <TopPicks />
        <StreamingNow />
        <Watchlist />
      </div>
    </div>
  );
};

export default FeaturedMovies;
