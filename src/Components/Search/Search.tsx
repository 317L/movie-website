import { ISearch } from "../../TSInterface";
import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import "./Search.scss";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePage from "../../SinglePage/SinglePage";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Search.scss";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [content, setContent] = useState([]);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async () => {
    if (!searchText) return;
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
    } catch (error) {
      console.log("Axios GET request failed", error);
    }
    setPageNo((prevNo) => prevNo + 1);
  };

  useEffect(() => {
    fetchSearch();
    return () => {
      setPageNo(pageNo);
    };
  }, [type]);

  return (
    <div>
      <InfiniteScroll
        dataLength={content.length}
        next={fetchSearch}
        hasMore={true}
        loader={true}
        scrollThreshold="200px"
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
            <Button onClick={fetchSearch} variant="contained">
              <SearchIcon fontSize="large" />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
            onChange={(_event, newValue) => {
              setType(newValue);
              setPageNo(1);
            }}
          >
            <Tab label="Search Movies" />
            <Tab label="Search TV Series" />
          </Tabs>
        </ThemeProvider>
        <div className="Trending">
          {content &&
            content.map((search: ISearch) => (
              <SinglePage
                key={search.id}
                id={search.id}
                poster={search.poster_path}
                title={search.title || search.name}
                date={search.first_air_date || search.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={search.vote_average}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Search;
