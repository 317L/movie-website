import axios from "axios";
import { useState, useEffect } from "react";
import SinglePage from "../../SinglePage/SinglePage";
import "./Trending.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { IMovies } from "../../TSInterface";

const Trending = () => {
  const [movie, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&query&page=${pageNo}`
      );
      if (pageNo) {
        const arr = [...movie, ...data.results] as any;
        setMovies(arr);
      }
    } catch (error) {
      console.log("Axios GET request failed", error);
    }
    setPageNo((prevNo) => prevNo + 1);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <InfiniteScroll
      dataLength={movie.length}
      next={fetchTrending}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollThreshold="200px"
    >
      <div className="Trending">
        {movie.map((trending: IMovies) => (
          <SinglePage
            key={trending.id}
            id={trending.id}
            poster={trending.poster_path}
            title={trending.title || trending.name}
            date={trending.first_air_date || trending.release_date}
            media_type={trending.media_type}
            vote_average={trending.vote_average}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Trending;
