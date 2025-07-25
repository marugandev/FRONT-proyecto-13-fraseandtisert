import "./CircleSpin.css";

import type { CircleSpinProps } from "../../../types/circle-spin";

const CircleSpin = ({ src, alt }: CircleSpinProps) => {
  return <img className="circle-spin" src={src} alt={alt} />;
};

export default CircleSpin;
