import React, { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, useLocation, Outlet } from "react-router-dom";
import FeaturedMovies from "../components/Featured/FeaturedMovies.jsx";
import PropTypes from "prop-types";
import { Header } from "../components/Navbar/Header.jsx";
import { Footer } from "../components/UI/Footer.jsx";
import Signup from "../components/Auth/Signup.jsx"; // Renamed from Signin
import Loader from "../components/UI/Loader.jsx";
import Login from "../components/Navbar/Login.jsx";
import WatchlistPage from "../Pages/watchlistPage.jsx";
import Movies from "../components/Navbar/Movies.jsx";
import Shows from "../Pages/Shows.jsx";

const Page_Component = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  const hideLayoutRoutes = ["/signin", "/signup"];
  const shouldShowFooter = !hideLayoutRoutes.includes(location.pathname);

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

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
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="*" element={<div>404: Page Not Found</div>} />
    </Route>
  )
);

Page_Component.propTypes = {
  children: PropTypes.node,
};

export default router;