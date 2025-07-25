import { apiClient } from "../client";
import type { CartItem } from "../../types/cart/cart-item";
import { CART_ENDPOINTS } from "../endpoints/cart";

export const addItemToCartApi = (item: CartItem, token?: string) => {
  return apiClient<CartItem[]>({
    endpoint: CART_ENDPOINTS.ADD_ITEM,
    method: "POST",
    body: item,
    token
  });
};
