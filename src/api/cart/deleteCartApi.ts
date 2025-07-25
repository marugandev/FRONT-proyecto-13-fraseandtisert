import { apiClient } from "../client";
import { CART_ENDPOINTS } from "../endpoints/cart";

export const deleteCartApi = (token?: string) => {
  return apiClient({
    endpoint: CART_ENDPOINTS.DELETE,
    method: "DELETE",
    token
  });
};
