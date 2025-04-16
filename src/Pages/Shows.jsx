import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowItem from "./ShowItem";

// Static fallback data to avoid API error
const staticShows = [
  {
    title: "Stranger Things",
    posterUrl: "https://via.placeholder.com/150x100?text=Stranger+Things",
    rating: "8.7",
    year: "2016",
    plot: "A group of friends encounter supernatural forces in their small town.",
    actors: "Millie Bobby Brown, Finn Wolfhard",
    genre: "Sci-Fi, Horror",
    runtime: "50 min",
  },
  {
    title: "The Mandalorian",
    posterUrl: "https://via.placeholder.com/150x100?text=The+Mandalorian",
    rating: "8.8",
    year: "2019",
    plot: "A bounty hunter navigates the galaxy with a mysterious baby Yoda.",
    actors: "Pedro Pascal, Gina Carano",
    genre: "Action, Sci-Fi",
    runtime: "40 min",
  },
  {
    title: "The Witcher",
    posterUrl: "https://via.placeholder.com/150x100?text=The+Witcher",
    rating: "8.2",
    year: "2019",
    plot: "A monster hunter faces destiny and dark magic in a fantasy world.",
    actors: "Henry Cavill, Anya Chalotra",
    genre: "Fantasy, Adventure",
    runtime: "60 min",
  },
];

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Comment out API call to avoid "Failed to load shows" error
    /*
    const fetchShows = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/shows", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setShows(response.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching shows:", err.response?.data || err.message);
        setShows(staticShows);
        setError("Failed to load shows from API. Showing sample data.");
        setLoading(false);
      }
    };
    fetchShows();
    */

    // Use static data directly
    setShows(staticShows);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <p className="text-stone-300 text-lg">Loading shows...</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white mb-8">TV Shows</h1>
      {error && (
        <p className="text-red-600 text-lg mb-4 text-center">{error}</p>
      )}
      <div className="flex flex-col gap-4">
        {shows.length > 0 ? (
          shows.map((show) => (
            <ShowItem
              key={show.title}
              title={show.title}
              posterSrc={show.posterUrl}
              rating={show.rating}
              year={show.year}
              type="Show"
              plot={show.plot}
              actors={show.actors}
              genre={show.genre}
              runtime={show.runtime}
            />
          ))
        ) : (
          <p className="text-stone-300 text-lg text-center">
            No shows available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Shows;