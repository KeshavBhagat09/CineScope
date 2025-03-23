import React, { useState } from 'react';

const Watchlist = () => {
  // Initial watchlist items
  const initialItems = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, type: "Movie", rating: 9.3, watched: false, posterUrl: "/api/placeholder/180/270" },
    { id: 2, title: "Breaking Bad", year: 2008, type: "TV Series", rating: 9.5, watched: true, posterUrl: "/api/placeholder/180/270" },
    { id: 3, title: "Inception", year: 2010, type: "Movie", rating: 8.8, watched: false, posterUrl: "/api/placeholder/180/270" },
    { id: 4, title: "The Dark Knight", year: 2008, type: "Movie", rating: 9.0, watched: true, posterUrl: "/api/placeholder/180/270" },
    { id: 5, title: "Stranger Things", year: 2016, type: "TV Series", rating: 8.7, watched: false, posterUrl: "/api/placeholder/180/270" },
    { id: 6, title: "The Mandalorian", year: 2019, type: "TV Series", rating: 8.8, watched: true, posterUrl: "/api/placeholder/180/270" },
  ];

  // State to manage the watchlist items
  const [items, setItems] = useState(initialItems);

  // State to manage the filter type (e.g., movies, TV shows, watched, unwatched)
  const [filter, setFilter] = useState("all");

  // State to manage the sorting criteria (e.g., by name, year, rating)
  const [sortBy, setSortBy] = useState("added");

  // Filter the items based on the selected filter
  const filteredItems = items.filter(item => {
    if (filter === "movies") return item.type === "Movie";
    if (filter === "tv") return item.type === "TV Series";
    if (filter === "watched") return item.watched;
    if (filter === "unwatched") return !item.watched;
    return true; // Default: show all items
  });

  // Sort the filtered items based on the selected sorting criteria
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title); // Sort alphabetically by title
    if (sortBy === "year") return b.year - a.year; // Sort by release year (descending)
    if (sortBy === "rating") return b.rating - a.rating; // Sort by rating (descending)
    return a.id - b.id; // Default: sort by the order they were added
  });

  // Toggle the "watched" status of an item
  const toggleWatched = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, watched: !item.watched } : item
    ));
  };

  // Remove an item from the watchlist
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="relative w-full flex flex-col items-start px-4 min-h-[400px]">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-800">
          <h2 className="text-2xl font-semibold flex items-center gap-2 self-start text-stone-300">
            <span className="text-yellow-500 text-3xl mr-2 white">|</span> From your Watchlist &gt;
          </h2>
          {/* Filter and Sort Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select 
              className="bg-gray-900 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="movies">Movies</option>
              <option value="tv">TV Shows</option>
              <option value="unwatched">Unwatched</option>
              <option value="watched">Watched</option>
            </select>
            <select 
              className="bg-gray-900 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="added">Date Added</option>
              <option value="name">Title (A-Z)</option>
              <option value="year">Release Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        {/* Watchlist Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {sortedItems.length > 0 ? (
            sortedItems.map(item => (
              <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 w-full">
                <div className="relative">
                  {/* Poster Image */}
                  <img 
                    src={item.posterUrl} 
                    alt={`${item.title} poster`}
                    className="w-full h-64 object-cover"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-yellow-400 font-bold text-sm px-2 py-1 rounded">
                    ★ {item.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-3">
                  {/* Title and Year */}
                  <h3 className="font-bold text-white truncate">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.year} • {item.type}</p>
                  <div className="flex justify-between">
                    {/* Watched/Unwatched Button */}
                    <button 
                      onClick={() => toggleWatched(item.id)}
                      className={`text-xs font-bold py-1 px-2 rounded transition-colors ${
                        item.watched 
                          ? 'bg-green-700 hover:bg-green-800 text-white' 
                          : 'bg-blue-700 hover:bg-blue-800 text-white'
                      }`}
                    >
                      {item.watched ? 'Watched' : 'Unwatched'}
                    </button>
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty Watchlist Message
            <div className="col-span-full bg-gray-900 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
              <p className="text-gray-400 mb-4">Browse our catalog and add movies or TV shows you want to watch</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-colors">
                Browse Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;