export type QuantitySelectorProps = {
  value: number;
  onIncrement: () => void;
  disableIncrement?: boolean;
  onDecrement: () => void;
  disableDecrement?: boolean;
};
