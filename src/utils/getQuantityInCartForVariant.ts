import type { CartItem } from "../types/cart/cart-item";
import type { ProductColor } from "../types/product/product-color";
import type { ProductSize } from "../types/product/product-size";

export const getQuantityInCartForVariant = (
  cart: CartItem[],
  id: string,
  color: ProductColor,
  size: ProductSize
) => {
  return cart
    .filter((i) => i.productId === id && i.color === color && i.size === size)
    .reduce((acc, item) => acc + item.quantity, 0);
};
