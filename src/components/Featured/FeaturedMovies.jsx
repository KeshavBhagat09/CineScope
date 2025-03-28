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
  const [isHovering, setIsHovering] = useState(false); // New state for hover
  const videoRef = useRef(null);

  // Array of custom images for FeaturedMovieCard (one per video)
  const customFeaturedImages = [
    "../src/assets/BreakingBad.jpg", // Image for video 1
    "../src/assets/GameOfThrones.jpg", // Image for video 2
    "../src/assets/PeakyBlinders2.jpg", // Image for video 3
    "../src/assets/Spider.jpg", // Image for video 4
    // Add more images as needed to match your videos
  ];

  // Fetch video data from API
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
        console.log("API Response:", response.data);
        let videos = response.data.data || [];
        if (videos.length === 0) throw new Error("No videos returned from API");

        videos.sort((a, b) => a.title.localeCompare(b.title));
        setFeaturedVideos(videos);

        const startIndex = videos.findIndex((video) =>
          video.title.toLowerCase().includes("trailer1")
        );
        setCurrentFeaturedIndex(startIndex !== -1 ? startIndex : 0);
      } catch (err) {
        console.error("Error fetching featured videos:", err);
        setError("Failed to load videos. Please try again later.");
        setFeaturedVideos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [sectionTitle]);

  // Handle video playback on hover
  useEffect(() => {
    if (videoRef.current && featuredVideos[currentFeaturedIndex]?.videoUrl) {
      if (isHovering) {
        videoRef.current.load();
        videoRef.current
          .play()
          .catch((err) => console.error("Error playing video:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovering, currentFeaturedIndex, featuredVideos]);

  // Play next video when current one ends
  useEffect(() => {
    if (videoRef.current) {
      const handleVideoEnd = () => {
        setCurrentFeaturedIndex(
          (prevIndex) => (prevIndex + 1) % featuredVideos.length
        );
        setIsHovering(false); // Stop hovering state when video ends
      };

      videoRef.current.addEventListener("ended", handleVideoEnd);
      return () =>
        videoRef.current?.removeEventListener("ended", handleVideoEnd);
    }
  }, [featuredVideos, currentFeaturedIndex]);

  // Extract background color from VideoData image
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

  // Match API video with custom image based on index
  const getVideoWithImage = (apiVideo, index) => {
    return {
      ...apiVideo,
      image: customFeaturedImages[index % customFeaturedImages.length], // Cycle through images
      poster: customFeaturedImages[index % customFeaturedImages.length], // Fallback
    };
  };

  const currentVideo = getVideoWithImage(
    featuredVideos[currentFeaturedIndex],
    currentFeaturedIndex
  );

  return (
    <div
      className="min-h-screen transition-all duration-500 relative"
      style={{ background: backgroundGradient }}
    >
      {/* Featured Movie Section */}
      <div
        className="relative w-full h-[80vh] flex items-end"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background Image (shown by default) */}
        {!isHovering && (
          <img
            src={currentVideo?.image || "/placeholder.jpg"}
            alt={currentVideo?.title || "Featured Movie"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Background Video (shown on hover) */}
        <video
          src={currentVideo?.videoUrl || "/placeholder.mp4"}
          ref={videoRef}
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover ${
            isHovering ? "block" : "hidden"
          }`}
        />

        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* Movie Details Overlay */}
        <div className="relative z-10 p-8 md:p-12 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {currentVideo?.title || "Movie Title"}
          </h1>
          <div className="flex items-center gap-3 text-white mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-blue-500" : "text-gray-400"
                  }`} // 4 stars filled
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.174 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
            <span>7 Reviews</span>
            <span>Season 1 2025</span>
            <span className="border border-white px-2 py-1 rounded">
              Cert. 18
            </span>
          </div>
          <p className="text-gray-300 mb-6">
            {currentVideo?.description ||
              "Seok, an eager yet genius neurosurgeon is reunited with Deokhee, the professor who ruined her long ago. Once, the two surgeons cared for each other more than anyone else. But now with the nothing..."}
          </p>
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
            WATCH TRAILER
          </button>
        </div>

        {/* Navigation Buttons (unchanged "navbar") */}
        <button
          onClick={() =>
            setCurrentFeaturedIndex(
              (prev) =>
                (prev - 1 + featuredVideos.length) % featuredVideos.length
            )
          }
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all z-10"
        >
          ❮
        </button>
        <button
          onClick={() =>
            setCurrentFeaturedIndex(
              (prev) => (prev + 1) % featuredVideos.length
            )
          }
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all z-10"
        >
          ❯
        </button>
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