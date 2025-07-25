import "./NotFound.css";

import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="site-not-found">
      <h2 className="site-not-found__title">
        Error 404 | Esta página no esta disponible
      </h2>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Volver atrás
      </Button>
    </section>
  );
};

export default NotFound;
