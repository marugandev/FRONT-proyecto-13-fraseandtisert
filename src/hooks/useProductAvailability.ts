import type { Product } from "../types/product/product";
import type { ProductColor } from "../types/product/product-color";
import type { ProductSize } from "../types/product/product-size";
import { useMemo } from "react";

const useProductAvailability = (
  product: Product,
  selectedColor: ProductColor,
  selectedSize: ProductSize
) => {
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor
  );

  const availableColors = useMemo(() => {
    return product.variants
      .filter((v) => v.availability.some((a) => a.quantity > 0))
      .map((v) => v.color);
  }, [product.variants]);

  const availableSizes = useMemo(() => {
    return (
      selectedVariant?.availability
        .filter((s) => s.quantity > 0)
        .map((s) => s.size) || []
    );
  }, [selectedVariant]);

  const selectedStock =
    selectedVariant?.availability.find((s) => s.size === selectedSize)
      ?.quantity || 0;

  return {
    availableColors,
    availableSizes,
    selectedVariant,
    selectedStock
  };
};

export default useProductAvailability;
