import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import WatchlistIcon from "../../assets/Watchlist.svg";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/current-user", {
          withCredentials: true,
        });
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    updateCurrentPage();
    checkAuth();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      navigate("/signin"); // Changed from /login to /signin
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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

        {/* Right Side: Watchlist + Login/Logout */}
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

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1  rounded hover:bg-red-600/20 hover:border-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin" // Changed from /login to /signin
              className="px-4 py-1  rounded hover:bg-white/20 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};