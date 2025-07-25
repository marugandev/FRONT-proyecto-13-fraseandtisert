import { apiClient } from "../client";
import { FAVORITE_ENDPOINTS } from "../endpoints/favorite";

export const addFavorite = (productId: string, token: string) => {
  return apiClient<null>({
    endpoint: FAVORITE_ENDPOINTS.ADD(productId),
    method: "POST",
    token
  });
};
