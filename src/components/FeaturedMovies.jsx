import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { FeaturedMovies as FeaturedData } from "./VideoData";
import { VideoData } from "./VideoData";
import FeaturedMovieCard from "./FeaturedMovieCard";
import { FeaturedMovieCard as FeaturedMovieCardData } from "./VideoData";

const FeaturedMovies = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState(
    "linear-gradient(to bottom, #1a1a1a, #000)" // Default fallback gradient
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % FeaturedData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const extractColorFromImage = (imageSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Allow cross-origin images
        img.src = imageSrc;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas size to image size
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Get pixel data
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const pixels = imageData.data;

          let r = 0, g = 0, b = 0, count = 0;

          // Loop through every 4th pixel (R, G, B, A)
          for (let i = 0; i < pixels.length; i += 4 * 100) { // Skip some pixels for performance
            r += pixels[i];     // Red
            g += pixels[i + 1]; // Green
            b += pixels[i + 2]; // Blue
            count++;
          }

          // Get the average RGB values
          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          // Convert to hex
          const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

          resolve(hexColor);
        };

        img.onerror = () => reject("Failed to load image.");
      });
    };

    const updateGradient = async () => {
      if (!FeaturedData[currentFeaturedIndex]?.image) {
        console.warn("No image found for the featured video.");
        return;
      }

      try {
        const dominantColor = await extractColorFromImage(FeaturedData[currentFeaturedIndex].image);
        const newGradient = `linear-gradient(to bottom, ${dominantColor}, #000)`;
        setBackgroundGradient(newGradient);
      } catch (error) {
        console.error("Error extracting color:", error);
        setBackgroundGradient("linear-gradient(to bottom, #1a1a1a, #000)"); // Fallback gradient
      }
    };

    updateGradient();
  }, [currentFeaturedIndex]);

  if (!FeaturedData || FeaturedData.length === 0) {
    return <div className="text-white p-8">No featured videos available</div>;
  }

  const currentFeaturedVideo = FeaturedData[currentFeaturedIndex];

  return (
    <div
      className="min-h-screen p-8 transition-all duration-500"
      style={{ background: backgroundGradient }}
    >
      <h1 className="text-white text-xl mb-4">Featured Movie: {currentFeaturedVideo.title}</h1>

      <div className="flex gap-5 max-md:flex-col">
        <div className="relative flex flex-col w-[74%] max-md:w-full">
          <div className="relative group cursor-pointer overflow-hidden rounded-xl">
            <img
              loading="lazy"
              src={currentFeaturedVideo.image || "/placeholder.svg"}
              alt={currentFeaturedVideo.title}
              className="object-contain grow mt-1.5 w-full rounded-xl aspect-[1.39] max-md:mt-10 max-md:max-w-full transition-transform duration-300"
            />
          </div>

          <div className="absolute bottom-5 left-5">
            <FeaturedMovieCard video={FeaturedMovieCardData[currentFeaturedIndex]} />
          </div>
        </div>

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
              {VideoData.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovies;
