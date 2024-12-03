import React from "react";

const Card = ({ info, onCardClick }) => {
  return (
    <div className="movie-card" onClick={() => onCardClick(info.imdbID)}>
      <div className="poster-container">
        <img 
          src={info.Poster !== 'N/A' ? info.Poster : 'placeholder.jpg'} 
          alt={info.Title} 
          className="movie-poster"
        />
      </div>
      <div className="movie-info">
        <h3>{info.Title}</h3>
        <div className="movie-meta">
          <span className="year">
            {info.Year || 'Year not available'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
