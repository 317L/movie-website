import { useEffect, useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TheatersIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";
import "./mainNav.scss";
import { useHistory } from "react-router-dom";

const SimpleBottomNavigation = () => {
  const [value, setValue] = useState(0);
  const history = useHistory();
  useEffect(() => {
    switch (value) {
      case 0:
        history.push({ pathname: `/Trending/` });
        break;
      case 1:
        history.push({ pathname: `/Movies/` });
        break;
      case 2:
        history.push({ pathname: `/TvSeries/` });
        break;
      case 3:
        history.push({ pathname: `/Search/` });
        break;
      case 4:
        history.push({ pathname: "/FavoritesMain/" });
    }
  }, [value, history]);
  return (
    <BottomNavigation
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction label="Movies" icon={<TheatersIcon />} />
      <BottomNavigationAction label="TvSeries" icon={<TvIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
};
export default SimpleBottomNavigation;
