import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import WatchlistIcon from "../../assets/Watchlist.svg";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 px-6 py-3 text-white transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-6 text-lg font-semibold pl-2">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-36 object-contain" />
          </Link>

          <motion.a
            href="/"
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-md hover:bg-white/20 transition"
          >
            Home
          </motion.a>
          <motion.a
            href="/movies"
            whileHover={{ scale: 1.1 }}
            className="hover:text-yellow-400 transition"
          >
            Movies
          </motion.a>
          <motion.a
            href="/shows"
            whileHover={{ scale: 1.1 }}
            className="hover:text-yellow-400 transition"
          >
            Shows
          </motion.a>
        </div>

        {/* Right Side: Watchlist + Login */}
        <div className="flex items-center gap-6 text-lg font-semibold pr-2">
          <Link
            to="/watchlist"
            className="flex items-center gap-2 hover:text-yellow-400 transition"
          >
            <img
              src={WatchlistIcon}
              alt="Watchlist Icon"
              className="w-5 h-5 filter invert"
            />
            <span>Watchlist</span>
          </Link>

          <Link
            to="/signin"
            className="px-4 py-1 border border-white rounded hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};