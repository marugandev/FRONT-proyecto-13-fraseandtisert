import type { CartItem } from "../types/cart/cart-item";

export const mergeCarts = (
  localCart: CartItem[],
  backendCart: CartItem[]
): CartItem[] => {
  const merged: CartItem[] = [...backendCart];

  for (const localCartItem of localCart) {
    const existing = merged.find(
      (item) =>
        item.productId === localCartItem.productId &&
        item.size === localCartItem.size &&
        item.color === localCartItem.color
    );

    if (existing) {
      existing.quantity += localCartItem.quantity;
    } else {
      merged.push(localCartItem);
    }
  }

  return merged;
};
