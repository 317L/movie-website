import React from "react";
import "./Header.scss";
import MovieCreationIcon from "@material-ui/icons/MovieCreation";

function Header() {
    return (
        <div className="header">
            <MovieCreationIcon />
            <p
                onClick={() => {
                    window.scroll(0, 0);
                }}
            >
                Entertainment&Fun
      </p>
        </div>
    );
}

export default Header;
