import "./Button.css";

import type { ButtonProps } from "../../../types/button";

const Button = ({
  variant = "primary",
  action,
  active = false,
  onClick,
  type = "button",
  style,
  children
}: ButtonProps) => {
  const classNames = [
    "button",
    `button--${variant}`,
    action ? `button--${action}` : "",
    active ? "button--active" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} onClick={onClick} type={type} style={style}>
      {children}
    </button>
  );
};

export default Button;
