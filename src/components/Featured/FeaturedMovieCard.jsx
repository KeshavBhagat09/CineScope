import PropTypes from "prop-types";
import { PlayCircle } from "lucide-react"; // Example of using Lucide icons

const FeaturedMovieCard = ({ video }) => {
  // If no video data is provided, return null (do not render anything)
  if (!video) return null;

  return (
    <div className="text-white p-4 group">
      <div className="flex items-end gap-4">
        {/* Image or Poster */}
        <img
          src={video.image || video.poster} // Ensure this is correctly pulling from VideoData.js
          alt={video.title}
          className="w-60 h-80 object-cover rounded-md"
        />

        {/* Play Icon */}
        <div className="flex items-center justify-center">
          <PlayCircle className="text-white w-24 h-24 group-hover:text-yellow-500 transition-colors duration-300" />
          {/* Icon changes color on hover */}
        </div>

        {/* Video Details */}
        <div className="flex-1">
          {/* Video Title */}
          <h2 className="text-lg font-bold mb-2">{video.title}</h2>
          {/* Video Subtitle or Fallback Text */}
          <p className="text-sm text-white-500 mb-4">
            {video.subtitle || "No subtitle available"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Prop validation for FeaturedMovieCard
FeaturedMovieCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired, // Video ID (required)
    title: PropTypes.string.isRequired, // Video title (required)
    subtitle: PropTypes.string, // Optional subtitle
    image: PropTypes.string, // Optional image URL
    poster: PropTypes.string, // Optional poster URL
  }).isRequired,
};

export default FeaturedMovieCard;
