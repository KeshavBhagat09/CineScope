import React from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Watchlist = () => {
  const { watchlist, setWatchlist, token } = useOutletContext();

  const addToWatchlist = async (movie) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/watchlist/add",
        {
          productId: movie._id,     // Movie must have _id
          price: movie.price || 100, // Replace with actual price if available
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json",
          },
          withCredentials: true, // Optional: allows cookies if needed
        }
      );

      console.log("✅ Watchlist updated:", response.data);
      setWatchlist([...watchlist, movie]);
    } catch (error) {
      console.error("❌ Failed to add to watchlist:", error.response?.data?.message || error.message);
    }
  };

  const handleRemove = (title) => {
    setWatchlist(watchlist.filter((movie) => movie.title !== title));
    // You can also call DELETE API here if backend supports it
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-white mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div key={item._id || item.title} className="bg-gray-900 rounded-lg p-3">
              <img src={item.posterUrl} alt={item.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <button
                onClick={() => handleRemove(item.title)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded mt-2"
              >
                Remove
              </button>
              <button
                onClick={() => addToWatchlist(item)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded mt-2 ml-2"
              >
                Add to DB
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
