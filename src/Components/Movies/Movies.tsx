import axios from "axios";
import { useState, useEffect } from "react";
import SinglePage from "../../SinglePage/SinglePage";
import InfiniteScroll from "react-infinite-scroll-component";
import Genres from "../../Genres/Genres";
import useGenres from "../../ComaPush/useGenre";
import { IMovies } from "../../TSInterface";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);
  // Po savjetu Branka i Mirze ovde sam u if statementima izmjenio da funkcija fetchMovies ukoliko ih je manje od jedan da izbaci samo jednu odnsno prvu ukoliko taj uslov nije ispunjen prelazi
  // u drugi dio statmenta i spaja dva objekta u jedan array. na kraju funkcije fetchMovies je funkcija setPage no gdje uzima vrijednost promjenjivu vrijednost pageNo i dodaje 1(zove novu stranicu)
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
    setPageNo(pageNo + 1);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL]);
  return (
    <div>
      <Genres
        id={1}
        name={""}
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
          {movies.map((movie: IMovies) => (
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
