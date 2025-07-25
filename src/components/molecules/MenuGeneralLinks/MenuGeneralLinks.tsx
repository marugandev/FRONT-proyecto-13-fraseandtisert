import "./MenuGeneralLinks.css";

import { generalRoutes } from "../../../routes/generalRoutes";
import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";

const MenuGeneralLinks = ({ closePanel }: { closePanel: () => void }) => {
  return (
    <>
      {generalRoutes.map(({ path, label }) => (
        <li key={path} className="menu__item menu__item-general">
          <UnderlineLink to={path} onClick={closePanel}>
            {label}
          </UnderlineLink>
        </li>
      ))}
    </>
  );
};

export default MenuGeneralLinks;
