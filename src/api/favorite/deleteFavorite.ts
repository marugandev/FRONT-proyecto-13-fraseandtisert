import { apiClient } from "../client";
import { FAVORITE_ENDPOINTS } from "../endpoints/favorite";

export const deleteFavorite = (productId: string, token: string) => {
  return apiClient<null>({
    endpoint: FAVORITE_ENDPOINTS.DELETE(productId),
    method: "DELETE",
    token
  });
};
