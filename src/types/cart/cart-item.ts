import type { Product } from "../product/product";
import type { ProductColor } from "../product/product-color";
import type { ProductSize } from "../product/product-size";

export type CartItem = {
  productId: string;
  slug?: string;
  name: string;
  featuredImage: string;
  category?: string;
  price: number;
  discount?: number;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
  product?: Product | null;
};
