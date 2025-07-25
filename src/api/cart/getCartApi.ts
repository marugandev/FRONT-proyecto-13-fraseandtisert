import { apiClient } from "../client";
import type { CartItem } from "../../types/cart/cart-item";
import { CART_ENDPOINTS } from "../endpoints/cart";

export const getCartApi = (token?: string) => {
  return apiClient<CartItem[]>({
    endpoint: CART_ENDPOINTS.GET,
    method: "GET",
    token
  });
};
