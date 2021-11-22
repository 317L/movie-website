import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import SinglePage from "../../SinglePage/SinglePage";
import "./Trending.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { IMovies } from "../../TSInterface";

const Trending = () => {
  const [movies, setMovies] = useState([]); // sto je ovdje niz ?
  const [pageNo, setPageNo] = useState(1);
  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&query&page=${pageNo}`
      );
      if (pageNo < 1) {
        setMovies(data.results);
      } else {
        const arr = [...movies, ...data.results] as any;
        setMovies(arr);
      }
    } catch (error) {
      console.log("Axios GET request failed", error);
    }
    setPageNo(pageNo + 1);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    return () => {
      fetchTrending();
    };
  }, []);
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchTrending}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollThreshold="500px"
    >
      <div className="Trending">
        {movies.map((movie: IMovies) => (
          <SinglePage
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title || movie.name}
            date={movie.first_air_date || movie.release_date}
            media_type={movie.media_type}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Trending;
