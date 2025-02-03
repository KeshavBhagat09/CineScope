import { createBrowserRouter, createRoutesFromElements, Route, useLocation } from "react-router-dom";
import FeaturedMovies from "../components/FeaturedMovies.jsx";
import PropTypes from "prop-types";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

const Page_Component = ({ children }) => {
  const location = useLocation(); // Get current route path
  const hideLayoutRoutes = ["/login", "/register"]; // Pages where header & footer should be hidden
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowLayout && <Header />} {/* Show Header only if not on login/register */}
      <div>{children}</div>
      {shouldShowLayout && <Footer />} {/* Show Footer only if not on login/register */}
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Page_Component>
            <FeaturedMovies />
          </Page_Component>
        }
      />
      <Route
        path="/login"
        element={<Login />} /> {/* No Page_Component to exclude Header & Footer */}
      <Route
        path="/register"
        element={<Register />} /> {/* No Page_Component to exclude Header & Footer */}
    </>
  )
);

Page_Component.propTypes = {
  children: PropTypes.node,
};

export default router;
  