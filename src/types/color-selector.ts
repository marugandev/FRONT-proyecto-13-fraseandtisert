import type { ProductColor } from "./product/product-color";

export type ColorSelectorProps = {
  options: ProductColor[];
  selected: string;
  onSelect: (color: ProductColor) => void;
};
