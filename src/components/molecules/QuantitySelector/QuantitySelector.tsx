import "./QuantitySelector.css";

import type { QuantitySelectorProps } from "../../../types/quantity-selector";
import Button from "../../atoms/Button/Button";

const QuantitySelector = ({
  value,
  onIncrement,
  disableIncrement = false,
  onDecrement,
  disableDecrement = false
}: QuantitySelectorProps) => {
  return (
    <fieldset className="quantity-selector">
      <legend className="quantity-selector__legend">Cantidad:</legend>
      <div className="quantity-selector__controls">
        <Button
          variant="icon"
          onClick={onDecrement}
          disabled={disableDecrement}
          aria-label="Disminuir cantidad"
        >
          {"−"}
        </Button>
        <span className="quantity-selector__value">{value}</span>
        <Button
          variant="icon"
          onClick={onIncrement}
          disabled={disableIncrement}
          aria-label="Aumentar cantidad"
        >
          {"+"}
        </Button>
      </div>
    </fieldset>
  );
};

export default QuantitySelector;
