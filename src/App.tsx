import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "../src/Components/Trending/Trending";
import Movies from "../src/Components/Movies/Movies";
import Series from "../src/Components/Series/Series";
import Search from "../src/Components/Search/Search";
import SimpleBottomNavigation from "./MainNav/mainNav";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Container>
          <Switch>
            <Route path="/Trending" component={Trending} />
            <Route path="/Movies" component={Movies} />
            <Route path="/TVSeries" component={Series} />
            <Route path="/Search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
};

export default App;
