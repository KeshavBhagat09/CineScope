import React, { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, useLocation, Outlet } from "react-router-dom";
import FeaturedMovies from "../components/Featured/FeaturedMovies.jsx";
import PropTypes from "prop-types";
import { Header } from "../components/Navbar/Header.jsx";
import { Footer } from "../components/UI/Footer.jsx";
import Signin from "../components/Auth/Signup.jsx"; 
import Loader from "../components/UI/Loader.jsx";
import Login from "../components/Navbar/Login.jsx";
import Watchlist from "../components/Watchlist/Watchlist.jsx"; // Import Watchlist
import Movies from "../components/Navbar/Movies.jsx";
import Shows from "../Pages/Shows.jsx";

const Page_Component = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Define routes where footer should be hidden
  const hideLayoutRoutes = ["/signin", "/signup"];
  
  // Check if current route is in the list of routes that should not show the footer
  const shouldShowFooter = !hideLayoutRoutes.includes(location.pathname);

  // ⏳ Watchlist State (Persistent)
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // 🛠 Sync watchlist with Local Storage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <Outlet context={{ watchlist, setWatchlist }} /> 
      {shouldShowFooter && <Footer />}
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Page_Component />}>
      <Route path="/" element={<FeaturedMovies />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/signup" element={<Signin />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/watchlist" element={<Watchlist />} /> {/* Watchlist Route */}
    </Route>
  )
);

Page_Component.propTypes = {
  children: PropTypes.node,
};

export default router;
