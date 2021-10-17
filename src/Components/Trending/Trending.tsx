import axios from "axios";
import React from "react";
import { useState, useEffect, FC } from "react";
import SinglePage from "../../SinglePage/SinglePage";
import "./Trending.scss";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  title: string;
  poster: string | number;
  date: number;
  id: number | string;
  media_type: string;
  vote_average: number;
  c: any;
  poster_path: string;
  first_air_date: number;
  name: string;
  release_date: number;
  arr: number | string;
}
const Trending: FC<Props> = () => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&query&page=${pageNo}}`
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

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchTrending}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollThreshold="500px"
    >
      <div className="Trending">
        {movies.map((c: Props, idx) => (
          <SinglePage
            key={idx}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Trending;
