import axios from "axios";
import { useState, useEffect } from "react";
import SinglePage from "../../SinglePage/SinglePage";
import InfiniteScroll from "react-infinite-scroll-component";
import Genres from "../../Genres/Genres";
import forGenres from "../../GenresToString/ForGenre";
import { IMovies } from "../../TSInterface";

const Series = () => {
  const [movie, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = forGenres(selectedGenres);

  const fetchSeries = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreforURL}`
      );
      if (pageNo > 1) {
        const arr = [...movie, ...data.results] as any;
        setMovies(arr);
      } else {
        setMovies(data.results);
      }
    } catch (error) {
      console.log("Axios GET request failed", error);
    }
    setPageNo((pageNo) => pageNo + 1);
  };
  useEffect(() => {
    fetchSeries();
  }, [genreforURL]);
  return (
    <InfiniteScroll
      dataLength={movie.length}
      next={fetchSeries}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollThreshold="200px"
    >
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPageNo}
      />

      <div className="Trending">
        {movie &&
          movie.map((series: IMovies) => (
            <SinglePage
              key={series.id}
              id={series.id}
              poster={series.poster_path}
              title={series.title || series.name}
              date={series.first_air_date || series.release_date}
              media_type="tv"
              vote_average={series.vote_average}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Series;
