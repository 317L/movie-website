import React from "react";
import "./App.scss";
import Header from "./Components/Header/Header";
// import SimpleBottomNavigation from "./Components/MainNav/mainNav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "../src/Components/Trending/Trending";
import Movies from "../src/Components/Movies/Movies";
import Series from "../src/Components/Series/Series";
import Search from "../src/Components/Search/Search";
import Movie from "../src/Components/Movie/Movie";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/Movies" component={Movies} />
            <Route path="/TVSeries" component={Series} />
            <Route path="/Search" component={Search} />
            {/* <Route path="/Movie/:movie" component={Movie} /> */}
            <Route path="/Movie/:genre/:movie" component={Movie} />
          </Switch>
        </Container>
      </div>
      {/* <SimpleBottomNavigation />*/}
    </BrowserRouter>
  );
};

export default App;
