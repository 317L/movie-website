import { Chip } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Movies {
    selectedGenres: any;
    setSelectedGenres: any;
    genres: any;
    setGenres: any;
    type: string;
    setPage: any;
    name: any;
    id: any;



}



const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, type, setPage, }: Movies) => {




    const handleAdd = (genre: { id: any }) => {
        setGenres(genres.filter((g: { id: any }) => g.id !== genre.id));
        setSelectedGenres([...selectedGenres, genre]);
        setPage(1);
    };

    function handleRemove(genre: { id: any }) {
        setSelectedGenres(selectedGenres.filter((selected: { id: any }) => selected.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    }

    //function for fetching the "Genre" API
    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&query&language=en-US`
        );

        setGenres(data.genres);

    };

    console.log(genres);
    //unmounted component
    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);



    return (

        <div style={{ padding: "6px 0" }}>
            {selectedGenres &&
                selectedGenres.map((genre: Movies) => (

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

            {genres.map((genre: Movies) => (
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
