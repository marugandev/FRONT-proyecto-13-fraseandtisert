import "./Tag.css";

import type { TagProps } from "../../../types/tag";

const Tag = ({ variant = "badge", children }: TagProps) => {
  const className = `tag tag--${variant}`;
  return <span className={className}>{children}</span>;
};

export default Tag;
