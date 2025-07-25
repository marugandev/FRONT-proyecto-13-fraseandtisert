import { apiClient } from "../client";
import type { CartItem } from "../../types/cart/cart-item";
import { CART_ENDPOINTS } from "../endpoints/cart";

export const updateCartApi = (items: CartItem[], token?: string) => {
  return apiClient<CartItem[]>({
    endpoint: CART_ENDPOINTS.UPDATE,
    method: "POST",
    body: { itemsCart: items },
    token
  });
};
