import './App.css';
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";

//API
const API_key = "86f09256"; 
const base_url = "https://www.omdbapi.com/"; 

const App = () => {
  const [movieData, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const fetchMovies = async (search = '') => {
    setIsLoading(true);
    const url = search 
      ? `${base_url}?s=${search}&apikey=${API_key}`
      : `${base_url}?s=movie&apikey=${API_key}`; 

    try {
      const responses = await Promise.all([
        fetch(url + '&page=1'),
        fetch(url + '&page=2') // Fetching the second page
      ]);

      const data = await Promise.all(responses.map(res => res.json()));
      
      const allMovies = data.flatMap(d => d.Response === "True" ? d.Search : []);
      
      if (allMovies.length === 0) {
        setSearchError(true);
        setData([]);
      } else {
        setSearchError(false);
        setData(allMovies.slice(0, 18));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovieDetails = (id) => {
    fetch(`${base_url}?i=${id}&apikey=${API_key}`)
      .then(res => res.json())
      .then(data => {
        setSelectedMovie(data);
      })
      .catch(error => console.error("Error fetching movie details:", error));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  const handleCardClick = (id) => {
    fetchMovieDetails(id);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="container">
      <header className="header">
        <img src="plex.png" alt="Logo" className="logo" />
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Find Movies & TV" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="nav-toggle" onClick={toggleNav}>
          &#9776; {/* Hamburger icon */}
        </div>
        <nav className={`Nav ${isNavOpen ? 'active' : ''}`}>
          <span>Live</span>
          <span>Features</span>
          <span>Download</span>
        </nav>
      </header>

      <main className="movies-area">
        {searchError ? (
          <p className="error-message">No movies found. Try another search.</p>
        ) : isLoading ? (
          <p className="loading">Loading movies...</p>
        ) : (
          <div className="movie-grid">
            {movieData.map((movie, index) => (
              <Card info={movie} key={index} onCardClick={handleCardClick} />
            ))}
          </div>
        )}
      </main>
    
      <Modal movie={selectedMovie} onClose={closeModal} />
    </div>
  );
};

export default App;
