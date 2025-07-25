import type { Product } from "../types/product/product";
import type { CartItem } from "../types/cart/cart-item";
import type { ProductColor } from "../types/product/product-color";
import type { ProductSize } from "../types/product/product-size";
import { getQuantityInCartForVariant } from "./getQuantityInCartForVariant";

export const getStockInfoFromProduct = (
  product: Product,
  cart: CartItem[],
  color: ProductColor,
  size: ProductSize,
  anulateCurrentQuantity: boolean = false
) => {
  const variant = product.variants.find((v) => v.color === color);
  const availability = variant?.availability.find((a) => a.size === size);
  const availableStock = availability?.quantity ?? 0;

  let quantityInCart = getQuantityInCartForVariant(
    cart,
    product._id,
    color,
    size
  );

  if (anulateCurrentQuantity) {
    const currentItem = cart.find(
      (item) =>
        item.productId === product._id &&
        item.color === color &&
        item.size === size
    );
    quantityInCart -= currentItem?.quantity ?? 0;
  }

  return {
    availableStock,
    quantityInCart,
    finalStock: availableStock - quantityInCart
  };
};
