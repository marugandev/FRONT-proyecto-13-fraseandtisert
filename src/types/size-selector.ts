import type { ProductSize } from "./product/product-size";

export type SizeSelectorProps = {
  options: ProductSize[];
  selected: ProductSize;
  onSelect: (size: ProductSize) => void;
};
