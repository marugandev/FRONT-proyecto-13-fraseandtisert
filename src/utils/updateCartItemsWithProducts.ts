import { getProductsByIds } from "../api/product/getProductsByIds";
import type { CartItem } from "../types/cart/cart-item";

export const updateCartItemsWithProducts = async (
  items: CartItem[]
): Promise<CartItem[]> => {
  const productIds = [...new Set(items.map((i) => i.productId))];

  if (productIds.length === 0) {
    return items;
  }

  const res = await getProductsByIds(productIds);

  if (res.status !== "success" || !res.data || !Array.isArray(res.data)) {
    return items;
  }

  const productMap = new Map(res.data.map((p) => [p._id, p]));

  return items.map((item) => ({
    ...item,
    product: productMap.get(item.productId) ?? null
  }));
};
