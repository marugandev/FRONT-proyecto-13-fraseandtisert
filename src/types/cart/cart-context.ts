import type { CartItem } from "./cart-item";
import type { ProductSize } from "../product/product-size";
import type { ProductColor } from "../product/product-color";

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: ProductSize, color: ProductColor) => void;
  updateQuantityInCart: (
    id: string,
    size: ProductSize,
    color: ProductColor,
    quantity: number
  ) => void;
  clearCart: () => void;
  isLoading: boolean;
};
