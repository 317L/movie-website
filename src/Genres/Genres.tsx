import { Chip } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { IGenre, IfilterGenre } from "../TSInterface";

const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, type, setPage }: IGenre) => {
  const Genr = Object.values(genres);
  const handleAdd = (genre: { id: number }) => {
    setGenres(genres.filter((genr: { id: number }) => genr.id !== genre.id));
    setSelectedGenres([...selectedGenres, genre]);
    setPage(1);
  };
  const handleRemove = (genre: { id: number }) => {
    setSelectedGenres(selectedGenres.filter((selected: { id: number }) => selected.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&query&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchGenres();
  }, [type]);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre: IfilterGenre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            clickable
            size="small"
            onDelete={() => handleRemove(genre)}
          />
        ))}

      {Genr &&
        Genr.map((genre: any) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
