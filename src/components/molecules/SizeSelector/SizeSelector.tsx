import "./SizeSelector.css";

import type { SizeSelectorProps } from "../../../types/size-selector";
import Button from "../../atoms/Button/Button";

const SizeSelector = ({ options, selected, onSelect }: SizeSelectorProps) => {
  return (
    <fieldset className="size-selector">
      <legend className="size-selector__legend">Talla:</legend>
      {options.map((size, i) => (
        <Button
          key={i}
          type="button"
          variant="primary"
          active={selected === size}
          onClick={() => onSelect(size)}
          aria-label={`Seleccionar talla ${size}`}
        >
          {size}
        </Button>
      ))}
    </fieldset>
  );
};

export default SizeSelector;
