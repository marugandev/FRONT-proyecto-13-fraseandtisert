import type { ProductCategory } from "./product-category";
import type { ProductColor } from "./product-color";
import type { ProductTag } from "./product-tag";
import type { ProductVariant } from "./product-variant";

export type Product = {
  _id: string;
  slug: string;
  name: string;
  text: string;
  author: string;
  category: ProductCategory;
  price: number;
  discount?: number;
  isFavorite?: boolean;
  featured?: boolean;
  featuredImage?: string;
  featuredColor: ProductColor;
  material?: string;
  tags?: ProductTag[];
  variants: ProductVariant[];
};
