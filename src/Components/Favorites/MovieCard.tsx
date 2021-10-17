import React from "react";
import { MovieControls } from "./MovieControls";

interface MovieCard {
  movie: any;
  type: any;
}

export const MovieCard = ({ movie, type }: MovieCard) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>

      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} Poster`} />

      <MovieControls type={type} movie={movie} />
    </div>
  );
};
