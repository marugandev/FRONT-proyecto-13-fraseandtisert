import "./MenuProfile.css";

import { useAuth } from "../../../context/Auth/useAuth";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";
import { profileRoutes, wishListRoute } from "../../../routes/profileRoutes";
import { adminRoutes } from "../../../routes/adminRoutes";
import { getVisibleRoutes } from "../../../utils/getVisibleRoutes";

const MenuProfile = ({ closePanel }: { closePanel: () => void }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const routes = getVisibleRoutes(user, {
    wishListRoute,
    profileRoutes,
    adminRoutes
  });

  return (
    <>
      {!user && (
        <Button
          variant="primary"
          onClick={() => {
            closePanel();
            navigate("/auth");
          }}
        >
          Iniciar sesión
        </Button>
      )}
      <nav
        className="menu__nav menu__nav-profile"
        aria-label="Perfil del usuario"
      >
        <ul className="menu__list menu__list-profile">
          {routes.map(({ path, label }) => (
            <li className="menu__item menu__item-profile" key={path}>
              <UnderlineLink to={path} onClick={closePanel}>
                {label}
              </UnderlineLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MenuProfile;
