import { apiClient } from "../client";
import type { CartItem } from "../../types/cart/cart-item";
import { CART_ENDPOINTS } from "../endpoints/cart";

export const deleteItemFromCartApi = (
  productId: string,
  size: string,
  color: string,
  token?: string
) => {
  return apiClient<CartItem[]>({
    endpoint: CART_ENDPOINTS.DELETE_ITEM,
    method: "POST",
    body: { productId, size, color },
    token
  });
};
