import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import "./Search.scss";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePage from "../../SinglePage/SinglePage";
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
  numOfPages: number;
}

const Search: React.FC = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState<any>();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    if (!searchText) {
      return;
    }
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${pageNo}&include_adult=false`
      );
      if (pageNo > 1) {
        const arr = [...content, ...data.results] as any;
        setContent(arr);
      } else {
        setContent(data.results);
      }

      // console.log(data);
    } catch (error) {
      console.error(error);
    }
    setPageNo(pageNo + 1);
    setNumOfPages(numOfPages + 1);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type]);

  return (
    <div>
      <InfiniteScroll
        dataLength={content.length}
        next={fetchSearch}
        hasMore={true}
        loader={<h4></h4>}
        scrollThreshold="0px"
      >
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 2 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: 10 }}>
              <SearchIcon fontSize="large" />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_event, newValue) => {
              setType(newValue);
              setPageNo(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>

        <div className="Trending">
          {content &&
            content.map((c: Props) => (
              <SinglePage
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Search;
