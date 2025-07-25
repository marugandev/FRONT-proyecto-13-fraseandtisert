import { CART_TYPES } from "../constants/cart-types";
import type { CartItem } from "../types/cart/cart-item";
import type { ProductColor } from "../types/product/product-color";
import type { ProductSize } from "../types/product/product-size";

export const initCart = (cart: CartItem[]) =>
  ({
    type: CART_TYPES.INIT,
    payload: cart
  } as const);

export const addToCart = (item: CartItem) =>
  ({
    type: CART_TYPES.ADD,
    payload: item
  } as const);

export const removeFromCart = (
  productId: string,
  size: ProductSize,
  color: ProductColor
) =>
  ({
    type: CART_TYPES.REMOVE,
    payload: { productId, size, color }
  } as const);

export const updateQuantityInCart = (
  productId: string,
  size: ProductSize,
  color: ProductColor,
  quantity: number
) =>
  ({
    type: CART_TYPES.UPDATE_QUANTITY,
    payload: { productId, size, color, quantity }
  } as const);

export const clearCart = () =>
  ({
    type: CART_TYPES.CLEAR
  } as const);

export type CartAction =
  | ReturnType<typeof initCart>
  | ReturnType<typeof addToCart>
  | ReturnType<typeof removeFromCart>
  | ReturnType<typeof updateQuantityInCart>
  | ReturnType<typeof clearCart>;
