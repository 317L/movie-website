import { Badge } from "@material-ui/core";
import React from "react";
import { img_300, unavailable } from "../Config/Config";
import ContentModal from "../Modal/Modal";
import "./SinglePage.scss";
import { Button } from "@material-ui/core";
import AddToFavorites from "../AddToFavorites/AddToFavorites"

interface Props {
    title: string;
    poster: string;
    date: number;
    id: number | String;
    media_type: string;
    vote_average: number;

}

function SinglePage({ id, poster, title, date, media_type, vote_average, }: Props) {
    return (
        <div>
            <ContentModal media_type={media_type} id={id}>
                <Badge
                    badgeContent={vote_average}
                    color={vote_average > 6 ? "primary" : "secondary"}
                />
                <img
                    className="poster"
                    src={poster ? `${img_300}${poster}` : unavailable}
                    alt={title}
                />
                <b className="title">{title}</b>
                <span className="subTitle">
                    {media_type === "tv" ? "TV Series" : "Movie"}
                    <span className="subTitle">{date}</span>

                </span>

                <span>
                    <Button onClick={AddToFavorites}>Add Favorites</Button>
                </span>

            </ContentModal>
        </div>

    );
}

export default SinglePage;
