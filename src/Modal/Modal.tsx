import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Carousel from "../Carousel/Carousel";
import YouTubeIcon from "@material-ui/icons/YouTube";
import axios from "axios";
import { img500, unavailable, unavailableLandscape } from "../Config/Config";
import "./Modal.scss";
import { IModal, IModalss } from "../TSInterface";

const ContentModal = ({ children, media_type, id }: IModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<IModalss>();
  const [video, setVideo] = useState();
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key); // results0 provjereva da li postoji taj objekat ukoliko vraca null ili undefined nece nastavit dalje
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);
  // pocetna vrijednost je undefined ukoliko je komponenta true i fade je open on ce napunit vrijednosti iz komponente
  return (
    <>
      <div className="media" color="inherit" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="Classes_Moda"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          {content && (
            <div className="Paper_paper">
              <div className="ContentModal">
                <img
                  src={content.poster_path ? `${img500}/${content.poster_path}` : unavailable}
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={content.backdrop_path ? `${img500}/${content.backdrop_path}` : unavailableLandscape}
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} ({content.first_air_date || content.release_date || ":/"})
                  </span>
                  {content.tagline && <i className="tagline">{content.tagline}</i>}

                  <span className="ContentModal__description">{content.overview}</span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;
