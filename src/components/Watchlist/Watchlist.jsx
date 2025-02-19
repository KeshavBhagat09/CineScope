import WatchlistIcon from "../../assets/Watchlist.svg";

export default function Watchlist() {
  return (
    <div className="flex flex-col items-center justify-center text-white p-8">
      <h2 className="text-2xl font-semibold flex items-center gap-2 self-start">
        <span className="text-yellow-500 text-3xl mr-2">|</span> From your Watchlist &gt;
      </h2>
      <div className="flex flex-col items-center mt-4">
        <div className="bg-gray-700 p-2 rounded-full mb-2">
          <span className="text-xl">
            <img src={WatchlistIcon} alt="Watchlist Icon" className="w-6 h-6" />
          </span>
        </div>
        <p className="font-semibold">Sign in to access your Watchlist</p>
        <p className="text-sm text-gray-400 text-center max-w-xs mt-1">
          Save shows and movies to keep track of what you want to watch.
        </p>
        <button className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
          Sign in to Cinescope
        </button>
      </div>
    </div>
  );
}