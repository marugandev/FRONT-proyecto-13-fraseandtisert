import type { CartItem } from "../types/cart/cart-item";

export const getQuantityInCart = (cart: CartItem[]): number =>
  cart.reduce((acc, item) => acc + item.quantity, 0);
