import type { ProductCategory } from "./product-category";
import type { ProductTag } from "./product-tag";

export type ProductTagsProps = {
  price?: number;
  category?: ProductCategory;
  tags?: ProductTag[];
  discount?: number;
};
