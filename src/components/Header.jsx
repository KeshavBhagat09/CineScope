import { useState } from "react";
import Logo from "../assets/logo.png";
import Watchlist from "../assets/watchlist.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex overflow-hidden flex-col w-full bg-zinc-950 max-md:max-w-full">
      {/* Top Header Section */}
      <div className="flex flex-col justify-center items-center px-16 py-4 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-2 justify-between items-center w-full max-w-[1442px] min-h-[39px] max-md:max-w-full">
          {/* Logo */}
          <a href="#home" className="shrink-0">
            <img
              loading="lazy"
              src={Logo}
              alt="CineScope logo"
              className="object-contain self-stretch my-auto aspect-[1.97] w-[61px]"
            />
          </a>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="flex flex-col justify-between w-8 h-6 bg-transparent border-none cursor-pointer focus:outline-none md:hidden"
            onClick={toggleMenu}
          >
            <span
              className={`block h-1 w-full bg-stone-300 rounded transform transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-stone-300 rounded transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-stone-300 rounded transform transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>

          {/* Navigation Links (Desktop View) */}
          <nav className="hidden md:flex justify-center items-center self-stretch my-auto text-base min-w-[240px] text-stone-300 max-md:max-w-full">
            <a href="#movies" className="self-stretch px-2.5 py-2 my-auto whitespace-nowrap">
              Movies
            </a>
            <a href="#tvshows" className="self-stretch px-2.5 py-2 my-auto">
              TV Shows
            </a>
            <a href="#watch" className="self-stretch px-2.5 py-2 my-auto whitespace-nowrap">
              Watch
            </a>
            <a href="#awards" className="self-stretch px-2.5 py-2 my-auto whitespace-nowrap">
              Awards
            </a>
          </nav>

          {/* Search Bar */}
          <form className="flex flex-1 gap-3.5 px-4 py-2.5 my-auto text-sm text-center text-stone-300 whitespace-nowrap bg-zinc-900 rounded-xl border border-solid border-zinc-800 items-center hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a74799e828d2ec913cd21ac7ffd37a63dbb9165e09b014e5594e15e6573d84f?placeholderIfAbsent=true&apiKey=3a9eed2ab9b94807b0368b782b883ee2"
              alt=""
              className="object-contain shrink-0 bg-blend-normal aspect-square w-[15px]"
            />
            <input
              type="search"
              placeholder="Search CineScope"
              aria-label="Search"
              className="flex-auto bg-transparent text-stone-300 placeholder-stone-500 border-none focus:outline-none"
            />
          </form>

          {/* Watchlist Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200"
            aria-label="Watchlist"
          >
            <img
              src={Watchlist}
              alt="Watchlist Icon"
              className="w-5 h-5 filter invert"
            />
            Watchlist
          </button>

          {/* Sign In Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200"
            aria-label="Sign In"
          >
            <span>Sign In</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col bg-zinc-900 text-stone-300 md:hidden">
          <a href="#movies" className="px-4 py-2 border-b border-zinc-800">
            Movies
          </a>
          <a href="#tvshows" className="px-4 py-2 border-b border-zinc-800">
            TV Shows
          </a>
          <a href="#celebs" className="px-4 py-2 border-b border-zinc-800">
            Celebs
          </a>
          <a href="#watch" className="px-4 py-2 border-b border-zinc-800">
            Watch
          </a>
          <a href="#awards" className="px-4 py-2 border-b border-zinc-800">
            Awards
          </a>
          <a href="#community" className="px-4 py-2 border-b border-zinc-800">
            Community
          </a>
        </div>
      )}
    </div>
  );
};
