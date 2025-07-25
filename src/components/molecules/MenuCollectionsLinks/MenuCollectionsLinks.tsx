import "./MenuCollectionsLinks.css";

import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";
import { collectionRoutes } from "../../../routes/collectionRoutes";

const MenuCollectionsLinks = ({ closePanel }: { closePanel: () => void }) => {
  return (
    <li className="menu__item menu__item-collection">
      <UnderlineLink to="/collection" onClick={closePanel}>
        Colecciones
      </UnderlineLink>
      <ul className="menu__sublist menu__sublist-collection">
        {collectionRoutes.map(({ path, label }) => (
          <li key={path} className="menu__subitem">
            <UnderlineLink to={path} onClick={closePanel}>
              {label}
            </UnderlineLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuCollectionsLinks;
