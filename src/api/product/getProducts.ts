import { apiClient } from "../client";
import type { Product } from "../../types/product/product";
import { PRODUCT_ENDPOINTS } from "../endpoints/product";

export const getProducts = (category?: string) => {
  return apiClient<Product[]>({
    endpoint: category
      ? PRODUCT_ENDPOINTS.GET_BY_CATEGORY(category)
      : PRODUCT_ENDPOINTS.GET_ALL
  });
};
