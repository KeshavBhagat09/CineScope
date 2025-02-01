import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import FeaturedMovies from "../components/FeaturedMovies.jsx";
import PropTypes from "prop-types";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

const Page_Component = ({ children, hideFooter }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      {!hideFooter && <Footer />} {/* Hide Footer when hideFooter is true */}
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
        element={
          <Page_Component hideFooter={true}>
            <Login />
          </Page_Component>
        }
      />
      <Route
        path="/register"
        element={
          <Page_Component hideFooter={true}>
            <Register />
          </Page_Component>
        }
      />
    </>
  )
);

Page_Component.propTypes = {
  children: PropTypes.node,
  hideFooter: PropTypes.bool, // Prop validation for hiding footer
};

export default router;
