import { Chip } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { IGenre } from "../TSInterface";

const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, type, setPage }: IGenre) => {
  const handleAdd = (genre: { id: any }) => {
    setGenres(genres.filter((g: { id: any }) => g.id !== genre.id));
    setSelectedGenres([...selectedGenres, genre]);
    setPage(1);
  };
  const handleRemove = (genre: { id: any }) => {
    setSelectedGenres(selectedGenres.filter((selected: { id: any }) => selected.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&query&language=en-US`
    );

    setGenres(data.genres);
  };

  console.log(genres);
  //unmounted component
  useEffect(() => {
    function fetchGenres() {}
    return () => {
      fetchGenres();
      setGenres({}); // unmounting     // zasto je ova funkcija ovde ? // Ovo je trebalo pojasnit nisam pojasnio i izbrisat sve eslintove
    };
  }, []);

  return (
    <div>
      <div style={{ padding: "6px 0" }}>
        {selectedGenres &&
          selectedGenres.map((genre: IGenre) => (
            <Chip
              style={{ margin: 2 }}
              label={genre.name}
              key={genre.id}
              color="primary"
              clickable
              size="small"
              onDelete={() => handleRemove(genre)} // ovaj Delete je Mirza  kao suvisan mada je branko reko da je okej
            />
          ))}

        {genres.map((genre: IGenre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)} // isto tako i za ovaj
          />
        ))}
      </div>
    </div>
  );
};

export default Genres;
