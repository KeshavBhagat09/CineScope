import React from "react";
import MovieCard from "../TopPicks/MovieCard"; // adjust if path differs
import DarkKnight from "../../assets/DarkKnight.jpeg"; // adjust if path differsD
import Inception from "../../assets/Inception.jpeg";

const Movies = () => {
  const movies = sampleMovies;

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-b from-black to-neutral-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">All Movies</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.movieId}
            title={movie.title}
            posterSrc={movie.posterUrl}
            rating={movie.rating}
            year={movie.year}
            type={movie.type}
            movieId={movie.movieId}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;

// Place this below or in a separate file and import it
const sampleMovies = [{
    movieId: "tt0111161",
    title: "The Shawshank Redemption",
    posterUrl: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
    rating: 9.3,
    year: 1994,
    type: "Drama",
  },
  {
    movieId: "tt0068646",
    title: "The Godfather",
    posterUrl: "https://m.media-amazon.com/images/I/71xBLRBYOiL._AC_SY679_.jpg",
    rating: 9.2,
    year: 1972,
    type: "Crime",
  },
  {
    movieId: "tt0468569",
    title: "The Dark Knight",
    posterUrl: DarkKnight,
    rating: 9.0,
    year: 2008,
    type: "Action",
  },
  {
    movieId: "tt0109830",
    title: "Forrest Gump",
    posterUrl: "https://m.media-amazon.com/images/I/713xd8jGVuL._AC_UF1000,1000_QL80_.jpg",
    rating: 8.8,
    year: 1994,
    type: "Drama",
  },
  {
    movieId: "tt1375666",
    title: "Inception",
    posterUrl: Inception,
    rating: 8.8,
    year: 2010,
    type: "Sci-Fi",
  },
  {
    movieId: "tt0120737",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    posterUrl: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg",
    rating: 8.8,
    year: 2001,
    type: "Fantasy",
  },
  {
    movieId: "tt0133093",
    title: "The Matrix",
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
    rating: 8.7,
    year: 1999,
    type: "Sci-Fi",
  },
  {
    movieId: "tt0120815",
    title: "Saving Private Ryan",
    posterUrl: "https://m.media-amazon.com/images/I/51I9V4wSw9L._AC_.jpg",
    rating: 8.6,
    year: 1998,
    type: "War",
  },
  {
    movieId: "tt0167260",
    title: "The Lord of the Rings: The Return of the King",
    posterUrl: "https://m.media-amazon.com/images/I/51Qvs9i5a+L._AC_.jpg",
    rating: 8.9,
    year: 2003,
    type: "Fantasy",
  },
  {
    movieId: "tt0110912",
    title: "Pulp Fiction",
    posterUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
    rating: 8.9,
    year: 1994,
    type: "Crime",
  },
  {
    movieId: "tt0080684",
    title: "Star Wars: Episode V - The Empire Strikes Back",
    posterUrl: "https://m.media-amazon.com/images/I/81aA7hEEykL._AC_SY679_.jpg",
    rating: 8.7,
    year: 1980,
    type: "Sci-Fi",
  },
  {
    movieId: "tt0137523",
    title: "Fight Club",
    posterUrl: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
    rating: 8.8,
    year: 1999,
    type: "Drama",
  },
  {
    movieId: "tt0102926",
    title: "The Silence of the Lambs",
    posterUrl: "https://m.media-amazon.com/images/I/51aKzR8BlJL._AC_.jpg",
    rating: 8.6,
    year: 1991,
    type: "Thriller",
  },
  {
    movieId: "tt0114369",
    title: "Se7en",
    posterUrl: "https://m.media-amazon.com/images/I/71W2K2Gr2CL._AC_SY679_.jpg",
    rating: 8.6,
    year: 1995,
    type: "Thriller",
  },
  {
    movieId: "tt0120689",
    title: "The Green Mile",
    posterUrl: "https://m.media-amazon.com/images/I/81qfFpq98-L._AC_SY679_.jpg",
    rating: 8.6,
    year: 1999,
    type: "Drama",
  },
  {
    movieId: "tt0114814",
    title: "The Usual Suspects",
    posterUrl: "https://m.media-amazon.com/images/I/51NpxX7XooL._AC_.jpg",
    rating: 8.5,
    year: 1995,
    type: "Crime",
  },
  {
    movieId: "tt0108052",
    title: "Schindler's List",
    posterUrl: "https://m.media-amazon.com/images/I/51xRkYoCE6L._AC_.jpg",
    rating: 8.9,
    year: 1993,
    type: "History",
  },
];
