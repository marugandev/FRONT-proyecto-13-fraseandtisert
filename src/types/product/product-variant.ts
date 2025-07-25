import type { ProductColor } from "./product-color";
import type { ProductAvailability } from "./product-availability";

export type ProductVariant = {
  color: ProductColor;
  images?: {
    flat?: string[];
    lifestyle?: string[];
  };
  availability: ProductAvailability[];
};
