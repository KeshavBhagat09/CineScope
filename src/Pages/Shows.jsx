import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowItem from "./ShowItem";
import Strangers from "../assets/Strangers.jpeg"
import Mandalorian from "../assets/Mandalorian.jpeg";
import Witcher from "../assets/Witcher.jpeg";
import Crown from "../assets/Crown.jpeg";
import BreakingBad2 from "../assets/BreakingBad2.jpg";
import GameOfThrones2 from "../assets/GameOfThrones2.jpg";
import Office from "../assets/Office.jpeg";
import BlackMirror from "../assets/BlackMirror.jpeg";
import Fargo from "../assets/Fargo.jpeg";
import Ozark from "../assets/Ozark.jpeg";


// Static fallback data to avoid API error
const staticShows = [
  {
    title: "Stranger Things",
    posterUrl: Strangers,
    rating: "8.7",
    year: "2016",
    plot: "A group of friends encounter supernatural forces in their small town.",
    actors: "Millie Bobby Brown, Finn Wolfhard",
    genre: "Sci-Fi, Horror",
    runtime: "50 min",
  },
  {
    title: "The Mandalorian",
    posterUrl: Mandalorian,
    rating: "8.8",
    year: "2019",
    plot: "A bounty hunter navigates the galaxy with a mysterious baby Yoda.",
    actors: "Pedro Pascal, Gina Carano",
    genre: "Action, Sci-Fi",
    runtime: "40 min",
  },
  {
    title: "The Witcher",
    posterUrl: Witcher,
    rating: "8.2",
    year: "2019",
    plot: "A monster hunter faces destiny and dark magic in a fantasy world.",
    actors: "Henry Cavill, Anya Chalotra",
    genre: "Fantasy, Adventure",
    runtime: "60 min",
  },
  {
    title: "Breaking Bad",
    posterUrl: BreakingBad2,
    rating: "9.5",
    year: "2008",
    plot: "A chemistry teacher turns to cooking methamphetamine to secure his family's future.",
    actors: "Bryan Cranston, Aaron Paul",
    genre: "Crime, Drama",
    runtime: "47 min",
  },
  {
    title: "The Crown",
    posterUrl: Crown,
    rating: "8.6",
    year: "2016",
    plot: "The reign of Queen Elizabeth II and major historical events that shaped the 20th century.",
    actors: "Claire Foy, Olivia Colman",
    genre: "Drama, History",
    runtime: "58 min",
  },
  {
    title: "Game of Thrones",
    posterUrl: GameOfThrones2,
    rating: "9.3",
    year: "2011",
    plot: "Noble families fight for control of the Iron Throne in a fantasy world.",
    actors: "Emilia Clarke, Kit Harington",
    genre: "Fantasy, Drama",
    runtime: "57 min",
  },
  {
    title: "The Office",
    posterUrl: Office,
    rating: "8.9",
    year: "2005",
    plot: "A mockumentary on a group of typical office workers and their daily lives.",
    actors: "Steve Carell, John Krasinski",
    genre: "Comedy",
    runtime: "22 min",
  },
  {
    title: "Black Mirror",
    posterUrl: BlackMirror,
    rating: "8.8",
    year: "2011",
    plot: "An anthology series exploring the dark sides of technology and human nature.",
    actors: "Daniel Kaluuya, Bryce Dallas Howard",
    genre: "Sci-Fi, Thriller",
    runtime: "60 min",
  },
  {
    title: "Fargo",
    posterUrl: Fargo,
    rating: "8.9",
    year: "2014",
    plot: "Various chronicles of deception and crime in the Midwest.",
    actors: "Billy Bob Thornton, Martin Freeman",
    genre: "Crime, Drama",
    runtime: "53 min",
  },
  {
    title: "Ozark",
    posterUrl: Ozark,
    rating: "8.5",
    year: "2017",
    plot: "A financial planner relocates his family to launder money for a drug cartel.",
    actors: "Jason Bateman, Laura Linney",
    genre: "Crime, Thriller",
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