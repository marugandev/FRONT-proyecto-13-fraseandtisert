import type { CartItem } from "../types/cart/cart-item";

export const getTotalPriceInCart = (cart: CartItem[]): number => {
  return cart.reduce((acc, item) => {
    const itemPrice =
      item.price * item.quantity * (1 - (item.discount ?? 0) / 100);
    return acc + itemPrice;
  }, 0);
};
