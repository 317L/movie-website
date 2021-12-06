import axios from "axios";
import { useState, useEffect } from "react";
import SinglePage from "../../SinglePage/SinglePage";
import InfiniteScroll from "react-infinite-scroll-component";
import Genres from "../../Genres/Genres";
import forGenres from "../../GenresToString/ForGenre";
import { IMovies } from "../../TSInterface";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = forGenres(selectedGenres);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreforURL}`
      );

      if (pageNo > 1) {
        const arr = [...movies, ...data.results] as any;
        setMovies(arr);
      } else {
        setMovies(data.results);
      }
    } catch (error) {
      console.log("Axios GET request failed", error);
    }
    setPageNo((prevNo) => prevNo + 1);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
  }, [genreforURL]);

  return (
    <div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPageNo}
      />
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollThreshold="200px"
      >
        <div className="Trending">
          {movies &&
            movies.map((movie: IMovies) => (
              <SinglePage
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title || movie.name}
                date={movie.first_air_date || movie.release_date}
                media_type="movie"
                vote_average={movie.vote_average}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Movies;
