import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TheatersIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";
import { useHistory } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "black",
    position: "fixed",
    bottom: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) history.push({ pathname: `/Trending/` });
    else if (value === 1) history.push({ pathname: `/Movies` });
    else if (value === 2) history.push({ pathname: `/TvSeries/` });
    else if (value === 3) history.push("/Search");
    else if (value === 4) history.push({ pathname: `/FavoritesMain/Add/` });
  }, [value, history, name]);

  return (
    <BottomNavigation
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{ color: "white" }} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{ color: "white" }} label="Movies" icon={<TheatersIcon />} />
      <BottomNavigationAction style={{ color: "white" }} label="TvSeries" icon={<TvIcon />} />
      <BottomNavigationAction style={{ color: "white" }} label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction style={{ color: "white" }} label="Favorites" icon={<FavoriteIcon />} />
    </BottomNavigation>
  );
}
