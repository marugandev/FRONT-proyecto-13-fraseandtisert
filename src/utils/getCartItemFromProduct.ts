import type { Product } from "../types/product/product";
import type { ProductFormData } from "../types/product/product-form-data";
import type { CartItem } from "../types/cart/cart-item";

export function getCartItemFromProduct(
  product: Product,
  options: ProductFormData
): CartItem {
  const { _id, slug, name, category, price, discount } = product;
  const { color, size, quantity } = options;

  const selectedVariant = product.variants.find((v) => v.color === color);

  const flatImage =
    selectedVariant?.images?.flat?.[0] ?? product.featuredImage ?? "";

  return {
    productId: _id,
    slug: slug ?? "",
    name,
    category,
    featuredImage: flatImage,
    price,
    discount,
    color,
    size,
    quantity,
    product
  };
}
