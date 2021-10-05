import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import SinglePage from "../SinglePage/SinglePage";
import InfiniteScroll from "react-infinite-scroll-component";
import Genres from "../Genres/Genres";
import useGenres from "../Hooks/useGenre";

interface Mov {
    title: string;
    poster: string | number;
    date: number;
    id: number;
    media_type: string;
    vote_average: number;
    c: any;
    poster_path: string;
    first_air_date: number;
    name: string;
    release_date: number;
}

const Movies: React.FC = () => {
    const [moviesAll, setMoviesAll] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [genreforURL]);

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreforURL}`
            );

            if (pageNo > 1) {
                const arr = [...moviesAll, ...data.results] as any;
                setMoviesAll(arr);
            } else {
                setMoviesAll(data.results);
            }
        } catch (error) {
            console.log("Axios GET request failed", error);
        }
        setPageNo(pageNo + 1);
    };

    return (
        <div>
            <Genres
                id={""}
                name={""}
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPageNo}
            />

            <InfiniteScroll
                dataLength={moviesAll.length}
                next={fetchMovies}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollThreshold="200px"
            >
                <div className="Trending">
                    {moviesAll.map((c: Mov, idx) => (
                        <SinglePage
                            key={idx}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                        />
                    ))}
                </div>
            </InfiniteScroll>

        </div>
    );
};

export default Movies;
