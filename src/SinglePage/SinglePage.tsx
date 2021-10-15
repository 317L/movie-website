import { Badge } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../Config/Config";
import ContentModal from "../Modal/Modal";
import "./SinglePage.scss";


interface Props {
    title: string;
    poster: string;
    date: number;
    id: number | String;
    media_type: string;
    vote_average: number;



}


function SinglePage({ id, poster, title, date, media_type, vote_average, }: Props) {
    const x = title.replace(/\s+/g, '-');
    return (
        <div><Link className="" to={`${x}`} >
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

            </ContentModal>
        </Link>
        </div>

    );
}

export default SinglePage;
