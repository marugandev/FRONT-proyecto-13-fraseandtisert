export type ButtonProps = {
  variant?: "primary" | "secondary" | "alternative" | "accent-red" | "icon";
  action?:
    | "close"
    | "submit"
    | "accept"
    | "cancel"
    | "favorite"
    | "cart"
    | "delete";
  active?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
};
