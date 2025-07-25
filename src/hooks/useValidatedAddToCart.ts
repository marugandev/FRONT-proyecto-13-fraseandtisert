import { useCart } from "../context/Cart/useCart";
import useModal from "../context/Modal/useModal";
import { getCartItemFromProduct } from "../utils/getCartItemFromProduct";
import type { Product } from "../types/product/product";
import type { ProductFormData } from "../types/product/product-form-data";
import type { ProductColor } from "../types/product/product-color";
import type { ProductSize } from "../types/product/product-size";
import { getStockInfoFromProduct } from "../utils/getStockInfoFromProduct";
import type { AddToCartResult } from "../types/cart/add-to-cart-result";

export const useValidatedAddToCart = (product: Product) => {
  const { cart, addToCart } = useCart();
  const { openModal } = useModal();

  const tryAddToCart = (
    data: ProductFormData,
    showModal = true
  ): AddToCartResult => {
    const { finalStock } = getStockInfoFromProduct(
      product,
      cart,
      data.color,
      data.size
    );

    if (showModal && finalStock <= 0) {
      openModal("info", "No hay más stock disponible.", "error");
      return { status: "error", reason: "no-stock" };
    }

    if (showModal && data.quantity > finalStock) {
      openModal(
        "info",
        `Sólo se pudieron añadir ${finalStock} unidad(es) por falta de stock.`,
        "warning"
      );
    }

    const quantityToAdd = Math.min(data.quantity, finalStock);
    const cartItem = getCartItemFromProduct(product, {
      ...data,
      quantity: quantityToAdd
    });

    addToCart(cartItem);
    return {
      status: "success",
      limited: quantityToAdd > data.quantity,
      addedQuantity: quantityToAdd
    };
  };

  const getStockInfo = (color: ProductColor, size: ProductSize) =>
    getStockInfoFromProduct(product, cart, color, size);

  return { tryAddToCart, getStockInfo };
};
