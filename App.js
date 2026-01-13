import React, { useState } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import './App.css';

const App = () => {
  // Initial movie data
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      rating: 8.8
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
      rating: 9.3
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      rating: 9.0
    },
    {
      id: 4,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
      rating: 8.9
    }
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'title') {
      setTitleFilter(value);
      applyFilters(value, ratingFilter);
    } else if (filterType === 'rating') {
      setRatingFilter(value);
      applyFilters(titleFilter, value);
    }
  };

  // Apply filters to movies
  const applyFilters = (title, rating) => {
    const filtered = movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(title.toLowerCase());
      const matchesRating = movie.rating >= rating;
      return matchesTitle && matchesRating;
    });
    setFilteredMovies(filtered);
  };

  // Add a new movie
  const handleAddMovie = (newMovie) => {
    const movieWithId = {
      ...newMovie,
      id: movies.length + 1,
      rating: parseFloat(newMovie.rating)
    };
    
    const updatedMovies = [...movies, movieWithId];
    setMovies(updatedMovies);
    applyFilters(titleFilter, ratingFilter);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Movie Collection</h1>
        <p>Browse, filter, and add your favorite movies</p>
      </header>

      <div className="container">
        <div className="sidebar">
          <AddMovie onAddMovie={handleAddMovie} />
        </div>

        <div className="main-content">
          <Filter 
            onFilterChange={handleFilterChange}
            titleFilter={titleFilter}
            ratingFilter={ratingFilter}
          />
          
          <MovieList movies={filteredMovies} />
          
          {filteredMovies.length === 0 && (
            <div className="no-results">
              <h3>No movies found matching your criteria</h3>
              <p>Try adjusting your filters or add a new movie!</p>
            </div>
          )}
        </div>
      </div>

      <footer className="App-footer">
        <p>Total Movies: {movies.length} | Showing: {filteredMovies.length}</p>
      </footer>
    </div>
  );
};

export default App;
