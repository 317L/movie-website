import axios from "axios";
import { useEffect, useState } from "react";
import { img300, noPicture } from "../Config/Config";
import "./Carousel.scss";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { ICarousel, ICarouselo } from "../TSInterface";

const Gallery = ({ id, media_type }: ICarousel) => {
  const [credits, setCredits] = useState([]);
  const handleDragStart = (e: any) => e.preventDefault();

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };
  useEffect(() => {
    fetchCredits();
  }, []);

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
      autoPlay
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={credits.map((credit: ICarouselo) => (
        <div className="carouselItem">
          <img
            src={credit.profile_path ? `${img300}/${credit.profile_path}` : noPicture}
            alt={credit?.name}
            onDragStart={handleDragStart}
            className="carouselItem__img"
          />
          <b className="carouselItem__txt">{credit.name}</b>
        </div>
      ))}
    />
  );
};

export default Gallery;
