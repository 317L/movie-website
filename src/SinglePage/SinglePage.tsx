import { Badge } from "@material-ui/core";
import { img300, unavailable } from "../Config/Config";
import ContentModal from "../Modal/Modal";
import "./SinglePage.scss";
import { ISinglePage } from "../TSInterface";

const SinglePage = ({ id, poster, title, date, media_type, vote_average }: ISinglePage) => {
  return (
    <div>
      <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"} />
        <img className="poster" src={poster ? `${img300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date}</span>
        </span>
      </ContentModal>
    </div>
  );
};

export default SinglePage;
