import type { ProductColor } from "../product/product-color";
import type { ProductSize } from "../product/product-size";

export type OrderItem = {
  productId: string;
  name: string;
  slug: string;
  featuredImage: string;
  price: number;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
};
