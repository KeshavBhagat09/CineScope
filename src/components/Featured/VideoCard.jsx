import PropTypes from "prop-types";

function VideoCard({ thumbnail, poster, title, subtitle, duration, playIcon }) {
  return (
    <div 
      className="relative group cursor-pointer rounded-xl overflow-hidden"
      tabIndex="0" // Makes the card focusable for keyboard navigation
      role="button" // Indicates the card acts as a button
      aria-label={`Play ${title}`} // Accessibility label for screen readers
    >
      {/* Card Container */}
      <div className="flex relative flex-col gap-4 px-4 py-4 aspect-[2.027] bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-900/90 transition-all duration-300">
        
        {/* Background Thumbnail */}
        <img
          loading="lazy" // Improves performance by lazy-loading the image
          src={thumbnail} // Thumbnail image URL
          alt="" // Empty alt text as it's decorative
          className="object-cover absolute inset-0 size-full -z-10 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Poster Image */}
        <img
          loading="lazy" // Lazy-loads the poster image
          src={poster} // Poster image URL
          alt={title} // Alt text for accessibility
          className="relative z-10 object-contain shrink-0 rounded-md aspect-[0.66] w-[40px] shadow-lg transform group-hover:translate-y-[-2px] transition-transform duration-300"
        />

        {/* Video Details */}
        <div className="flex relative z-10 flex-col text-stone-300">
          {/* Video Title */}
          <div className="text-lg font-medium group-hover:text-white transition-colors duration-200">
            {title}
          </div>

          {/* Video Subtitle */}
          <div className="mt-2.5 text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-200">
            {subtitle}
          </div>

          {/* Duration and Play Icon */}
          <div className="flex gap-5 self-end mt-8 items-center">
            {/* Video Duration */}
            <div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
              {duration}
            </div>

            {/* Play Icon */}
            <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-200">
              <img
                loading="lazy" // Lazy-loads the play icon
                src={playIcon} // Play icon image URL
                alt="" // Empty alt text as it's decorative
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prop validation for VideoCard
VideoCard.propTypes = {
  thumbnail: PropTypes.string.isRequired, // Thumbnail image URL (required)
  poster: PropTypes.string.isRequired,    // Poster image URL (required)
  title: PropTypes.string.isRequired,     // Video title (required)
  subtitle: PropTypes.string.isRequired,  // Video subtitle (required)
  duration: PropTypes.string.isRequired,  // Video duration (required)
  playIcon: PropTypes.string.isRequired,  // Play icon image URL (required)
};

export default VideoCard;