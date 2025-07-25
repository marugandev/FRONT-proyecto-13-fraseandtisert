import { apiClient } from "../client";
import type { Product } from "../../types/product/product";
import { FAVORITE_ENDPOINTS } from "../endpoints/favorite";

export const getFavorites = (token: string) => {
  return apiClient<Product[]>({
    endpoint: FAVORITE_ENDPOINTS.GET_ALL,
    method: "GET",
    token
  });
};
