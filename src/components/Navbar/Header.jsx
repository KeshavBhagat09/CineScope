import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import WatchlistIcon from "../../assets/Watchlist.svg";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const updateCurrentPage = () => {
      if (location.pathname === "/") setCurrentPage("home");
      else if (location.pathname === "/movies") setCurrentPage("movies");
      else if (location.pathname === "/shows") setCurrentPage("shows");
      else setCurrentPage(null);
    };

    updateCurrentPage();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

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
            className="px-3 py-1 rounded-md hover:bg-white/20 transition relative"
          >
            Home
            {currentPage === "home" && (
              <motion.span
                className="absolute inset-0 rounded-md"
                initial={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)", opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0 }}
              />
            )}
          </motion.a>
          <motion.a
            href="/movies"
            whileHover={{ scale: 1.1 }}
            className="hover:text-yellow-400 transition relative"
          >
            Movies
            {currentPage === "movies" && (
              <motion.span
                className="absolute inset-0 rounded-md"
                initial={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)", opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0 }}
              />
            )}
          </motion.a>
          <motion.a
            href="/shows"
            whileHover={{ scale: 1.1 }}
            className="hover:text-yellow-400 transition relative"
          >
            Shows
            {currentPage === "shows" && (
              <motion.span
                className="absolute inset-0 rounded-md"
                initial={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)", opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0 }}
              />
            )}
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
            className="px-4 py-1 border border-white rounded hover:bg-white/20 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};