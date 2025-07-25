import "./PosterColecction.css";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const PosterColecction = () => {
  const navigate = useNavigate();

  return (
    <section
      className="poster-collection"
      onClick={() => navigate("/collection")}
      role="button"
    >
      <div className="poster-collection__wrapper">
        <img
          src="/images/bg/bg_blur_fraseandtisert.webp"
          alt="Coleccion completa"
          className="poster-collection__image"
        />
        <div className="poster-collection__container-blur" />
      </div>
      <Button variant="primary">Ver colección</Button>
    </section>
  );
};

export default PosterColecction;
