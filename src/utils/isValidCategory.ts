import { productCategoryLabels } from "../types/product/product-category";

export const isValidCategory = (category: string) => {
  return Object.prototype.hasOwnProperty.call(productCategoryLabels, category);
};
