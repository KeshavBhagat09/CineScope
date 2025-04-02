import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, useLocation, Outlet } from "react-router-dom";
import FeaturedMovies from "../components/Featured/FeaturedMovies.jsx";
import PropTypes from "prop-types";
import { Header } from "../components/Navbar/Header.jsx";
import { Footer } from "../components/UI/Footer.jsx";
import Signin from "../components/Auth/Signup.jsx"; // Updated import
import Loader from "../components/UI/Loader.jsx";
import Login from '../components/Navbar/Login.jsx';

const Page_Component = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/register"];
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname);

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
      {shouldShowLayout && <Header />}
      <div>{children || <Outlet />}</div>
      {shouldShowLayout && <Footer />}
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Page_Component />}>
      <Route path="/" element={<FeaturedMovies />} />
      <Route path="/signup" element={<Signin />} /> {/* Updated route */}
      <Route path="/signin" element={<Login />} />
    </Route>
  )
);

Page_Component.propTypes = {
  children: PropTypes.node,
};

export default router;
