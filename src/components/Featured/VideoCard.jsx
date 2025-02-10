import PropTypes from "prop-types";

function VideoCard({ thumbnail, poster, title, subtitle, duration, playIcon }) {
  return (
    <div 
      className="relative group cursor-pointer rounded-xl overflow-hidden"
      tabIndex="0"
      role="button"
      aria-label={`Play ${title}`}
    >
      <div className="flex relative flex-col gap-4 px-4 py-4 aspect-[2.027] bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-900/90 transition-all duration-300">
        <img
          loading="lazy"
          src={thumbnail}
          alt=""
          className="object-cover absolute inset-0 size-full -z-10 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <img
          loading="lazy"
          src={poster}
          alt={title}
          className="relative z-10 object-contain shrink-0 rounded-md aspect-[0.66] w-[40px] shadow-lg transform group-hover:translate-y-[-2px] transition-transform duration-300"
        />
        <div className="flex relative z-10 flex-col text-stone-300">
          <div className="text-lg font-medium group-hover:text-white transition-colors duration-200">
            {title}
          </div>
          <div className="mt-2.5 text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-200">
            {subtitle}
          </div>
          <div className="flex gap-5 self-end mt-8 items-center">
            <div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
              {duration}
            </div>
            <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-200">
              <img
                loading="lazy"
                src={playIcon}
                alt=""
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
VideoCard.propTypes = {
  thumbnail: PropTypes.string.isRequired, // Must be a string and required
  poster: PropTypes.string.isRequired,    // Must be a string and required
  title: PropTypes.string.isRequired,     // Must be a string and required
  subtitle: PropTypes.string.isRequired,  // Must be a string and required
  duration: PropTypes.string.isRequired,  // Must be a string and required
  playIcon: PropTypes.string.isRequired,  // Must be a string and required
};

export default VideoCard;