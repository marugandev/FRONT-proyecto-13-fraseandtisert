import type { ProductColor } from "./product-color";
import type { ProductSize } from "./product-size";

export type ProductFormData = {
  id: string;
  name: string;
  price: number;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
};
