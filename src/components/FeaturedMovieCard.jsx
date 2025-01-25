import PropTypes from "prop-types"

const FeaturedMovieCard = ({ video }) => {
  if (!video) return null

  return (
    <div className="text-white p-4">
      <div className="flex items-start gap-4">
        {/* Image or Poster */}
        <img src={video.image || video.poster} alt={video.title} className="w-24 h-36 object-cover rounded-md" />

        {/* Video Details */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">{video.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{video.subtitle || "No subtitle available"}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            aria-label={`Watch ${video.title}`}
          >
            Watch Now
          </button>
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

