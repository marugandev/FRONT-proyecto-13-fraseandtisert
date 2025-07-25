import { createContext } from "react";
import type { CartContextType } from "../../types/cart/cart-context";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
