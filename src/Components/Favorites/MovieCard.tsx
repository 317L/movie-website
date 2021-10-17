import React from "react";
import MovieControls from "./MovieControls";

interface MovieCards {
  movie: any;
  type: any;
}

const MovieCard = ({ movie, type }: MovieCards) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>

      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />

      <MovieControls type={type} movie={movie} />
    </div>
  );
};
export default MovieCard;
