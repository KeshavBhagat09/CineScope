import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
 import FeaturedMovies from "../components/FeaturedMovies.jsx"
// import Language from "../NavPages/Language.jsx"
// import Login from "../NavPages/Login.jsx"
// import Return_order from "../NavPages/Return_order.jsx"
import PropTypes from "prop-types"
import { Header } from "../components/Header.jsx"; 
import {Footer} from "../components/Footer.jsx";
import Login from "../components/Login.jsx";

const Page_Component = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
        <Footer />
    </div>
  )
}





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
          <Page_Component>
            <Login />
          </Page_Component>
        }
        />{/*
      <Route
        path="/language"
        element={
          <Page_Component>
            <Language />
          </Page_Component>
        }
        />
      <Route
        path="/login"
        element={
          <Page_Component>
            <Login />
          </Page_Component>
        }
        />
      <Route
        path="/return-order"
        element={
          <Page_Component>
            <Return_order />
          </Page_Component>
        }
        /> */}
    </>,
  ),
)

Page_Component.propTypes = {
  children: PropTypes.node,
}

export default router