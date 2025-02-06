import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, useLocation, Outlet } from "react-router-dom";
import FeaturedMovies from "../components/FeaturedMovies.jsx";
import PropTypes from "prop-types";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Loader from "../components/Loader.jsx";

// Page_Component handles the layout and loading state
const Page_Component = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const location = useLocation(); // Get current route location
  const hideLayoutRoutes = ["/login", "/register"]; // Routes where Header & Footer should be hidden
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname); // Check if layout should be displayed

  useEffect(() => {
    // Simulating loading with a timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  // Show loader while loading is true
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {shouldShowLayout && <Header />} {/* Show Header if not on login/register page */}
      <div>{children || <Outlet />}</div> {/* Render child components or nested routes */}
      {shouldShowLayout && <Footer />} {/* Show Footer if not on login/register page */}
    </div>
  );
};

// Creating the router with defined routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Page_Component />}> {/* Page_Component acts as a layout wrapper */}
      <Route path="/" element={<FeaturedMovies />} /> {/* Home Page */}
      <Route path="/login" element={<Login />} /> {/* Login Page */}
      <Route path="/register" element={<Register />} /> {/* Register Page */}
    </Route>
  )
);

Page_Component.propTypes = {
  children: PropTypes.node, // Prop validation for children
};

export default router; // Exporting router for use in the main app
