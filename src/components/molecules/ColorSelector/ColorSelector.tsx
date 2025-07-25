import "./ColorSelector.css";

import type { ColorSelectorProps } from "../../../types/color-selector";
import Button from "../../atoms/Button/Button";
import { productColorVar } from "../../../types/product/product-color";

const ColorSelector = ({ options, selected, onSelect }: ColorSelectorProps) => (
  <fieldset className="color-selector">
    <legend className="color-selector__legend">Color:</legend>
    {options.map((color, i) => (
      <Button
        key={i}
        type="button"
        variant="icon"
        active={selected === color}
        onClick={() => onSelect(color)}
        style={{
          backgroundColor: productColorVar[color]
        }}
        aria-label={`Seleccionar color ${color}`}
      />
    ))}
  </fieldset>
);

export default ColorSelector;
