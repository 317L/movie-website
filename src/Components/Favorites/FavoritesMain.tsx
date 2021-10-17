import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { Watchlist } from "./Watchlist";
import { Add } from "./Add";
import "./Favorites.css";

import { GlobalProvider } from "./Context/GlobalState";
import { Watched } from "./Watched";

const FavoritesMain: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Watchlist />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/watched">
            <Watched />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
};

export default FavoritesMain;
