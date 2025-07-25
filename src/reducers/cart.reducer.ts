import { CART_TYPES } from "../constants/cart-types";
import type { CartReducerType } from "../types/cart/cart-reducer";

export const cartReducer: CartReducerType = (state, action) => {
  switch (action.type) {
    case CART_TYPES.INIT: {
      return action.payload;
    }

    case CART_TYPES.ADD: {
      const { productId, size, color, quantity } = action.payload;

      const existingItem = state.find(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        return state.map((item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...state, action.payload];
    }

    case CART_TYPES.REMOVE: {
      const { productId, size, color } = action.payload;

      return state.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          )
      );
    }

    case CART_TYPES.UPDATE_QUANTITY: {
      const { productId, size, color, quantity } = action.payload;

      return state.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: quantity }
          : item
      );
    }

    case CART_TYPES.CLEAR:
      return [];

    default:
      return state;
  }
};
