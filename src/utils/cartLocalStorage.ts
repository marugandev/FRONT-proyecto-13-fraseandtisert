import type { CartItem } from "../types/cart/cart-item";

const CART_KEY = "cart";

export const getCartFromLocalStorage = (): CartItem[] => {
  try {
    const cartLocal = localStorage.getItem(CART_KEY);
    return cartLocal ? JSON.parse(cartLocal) : [];
  } catch {
    return [];
  }
};

export const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCartFromLocalStorage = () => {
  localStorage.removeItem(CART_KEY);
};
