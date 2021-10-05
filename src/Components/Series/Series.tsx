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
    movies: any;
    poster_path: string;
    first_air_date: number;
    name: string;
    release_date: number;
}

const Series: React.FC = () => {
    const [moviesAlll, setMoviesAlll] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    useEffect(() => {
        window.scroll(0, 0);
        fetchSeries();
    }, [genreforURL]);

    const fetchSeries = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreforURL}`
            );

            if (pageNo > 1) {
                const arr = [...moviesAlll, ...data.results] as any;
                setMoviesAlll(arr);
            } else {
                setMoviesAlll(data.results);
            }
        } catch (error) {
            console.log("Axios GET request failed", error);
        }
        setPageNo(pageNo + 1);
    };

    return (
        <InfiniteScroll
            dataLength={moviesAlll.length}
            next={fetchSeries}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollThreshold="200px"
        >
            <Genres
                id={""}
                name={""}
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPageNo}
            />
            <div className="Trending">
                {moviesAlll.map((movies: Mov, idx) => (
                    <SinglePage
                        key={idx}
                        id={movies.id}
                        poster={movies.poster_path}
                        title={movies.title || movies.name}
                        date={movies.first_air_date || movies.release_date}
                        media_type="tv"
                        vote_average={movies.vote_average}
                    />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default Series;
