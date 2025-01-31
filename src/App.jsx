import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedMovies from "./components/FeaturedMovies";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FeaturedMovies />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
