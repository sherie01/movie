import React from "react";
import './Modal.css';

const Modal = ({ movie, onClose }) => {
  if (!movie) return null; 

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{movie.Title}</h2>
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
        <p className="release-date"><strong>Release Date:</strong> {movie.Released}</p>
        <p className="genre"><strong>Genre:</strong> {movie.Genre}</p>
        <p className="plot"><strong>Plot:</strong> {movie.Plot}</p>
        <div className="movie-meta">
        <p className="rating"><strong>Ratings:</strong> ⭐{movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
