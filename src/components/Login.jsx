import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreakingBad from "../assets/BreakingBad.jpg";
import PeakyBlinders from "../assets/PeakyBlinders.jpg";
import GameOfThrones from "../assets/GameOfThrones.jpg";
import Spider from "../assets/Spider.jpg";

const images = [BreakingBad, PeakyBlinders, GameOfThrones, Spider]; // Array of images

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(images[0]);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); // image changing time

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage("");
      console.log("Logged in with", { username, password });
      alert("Login successful!");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative transition-all duration-1000"
      style={{ backgroundImage: `url(${currentImage})` }} // Auto-changing background
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg relative">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white/20 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white/20 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="text-red-400 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <button
              onClick={handleRegister}
              className="text-blue-400 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
