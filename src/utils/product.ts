import type { Product } from "../types/product/product";

export const getVariantByColor = (product: Product, color?: string) => {
  const variant = product?.variants?.find((v) => v?.color === color);
  return variant?.images?.flat?.[0] || undefined;
};

export const getInitialDisplayImage = (
  product: Product
): string | undefined => {
  const variant = getVariantByColor(product!, product?.featuredColor);
  return variant || product?.featuredImage;
};
