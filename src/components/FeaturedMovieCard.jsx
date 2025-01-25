import PropTypes from "prop-types"
import { PlayCircle } from "lucide-react" // Example of using Lucide icons

const FeaturedMovieCard = ({ video }) => {
  if (!video) return null

  return (
    <div className="text-white  p-4">
      <div className="flex items-end gap-4">
        {/* Image or Poster */}
        <img src={video.image || video.poster} alt={video.title} className="w-60 h-80 object-cover rounded-md" />

        {/* Icon */}
        <div className="flex items-center justify-center">
          <PlayCircle className="text-white-500 w-24 h-24" />
        </div>

        {/* Video Details */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">{video.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{video.subtitle || "No subtitle available"}</p>
        </div>
      </div>
    </div>
  )
}

// Prop validation for FeaturedMovieCard
FeaturedMovieCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    poster: PropTypes.string,
  }).isRequired,
}

export default FeaturedMovieCard
