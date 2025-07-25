import { apiClient } from "../client";
import type { Product } from "../../types/product/product";
import { PRODUCT_ENDPOINTS } from "../endpoints/product";

export const getProductBySlug = (slug: string) => {
  return apiClient<Product>({
    endpoint: PRODUCT_ENDPOINTS.GET_BY_SLUG(slug)
  });
};
