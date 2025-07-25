import "./UnderlineLink.css";

import { NavLink } from "react-router-dom";
import type { UnderlineLinkProps } from "../../../types/underline-link";

const UnderlineLink = ({
  to,
  onClick,
  children,
  className = ""
}: UnderlineLinkProps) => {
  if (to !== undefined) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `underline-link ${className} ${
            isActive ? "underline-link--active" : ""
          }`
        }
      >
        {children}
      </NavLink>
    );
  }
  return (
    <button onClick={onClick} className={`underline-link ${className}`}>
      {children}
    </button>
  );
};

export default UnderlineLink;
