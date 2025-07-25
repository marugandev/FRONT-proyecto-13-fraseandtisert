import "./Logo.css";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <h1 className="logo">
      <Link to={"/"} className="logo__link">
        <img
          className="logo__img"
          src="/images/logos/logo_fraseandtisert.svg"
          alt="Logotipo fraseandtisert"
        />
      </Link>
    </h1>
  );
};

export default Logo;
