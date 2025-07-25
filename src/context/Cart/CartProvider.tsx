import { useEffect, useReducer, useState } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "../../reducers/cart.reducer";
import {
  addToCart,
  removeFromCart,
  updateQuantityInCart,
  clearCart,
  initCart
} from "../../actions/cart-actions";
import type { CartItem } from "../../types/cart/cart-item";
import type { ProductSize } from "../../types/product/product-size";
import type { ProductColor } from "../../types/product/product-color";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
  clearCartFromLocalStorage
} from "../../utils/cartLocalStorage";
import { mergeCarts } from "../../utils/mergeCarts";
import { getTokenFromLocalStorage } from "../../utils/authLocalStorage";
import { getCartApi } from "../../api/cart/getCartApi";
import { updateCartApi } from "../../api/cart/updateCartApi";
import { deleteCartApi } from "../../api/cart/deleteCartApi";
import { useAuth } from "../Auth/useAuth";
import useModal from "../Modal/useModal";
import { updateCartItemsWithProducts } from "../../utils/updateCartItemsWithProducts";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const loadCart = async () => {
      openModal("loader");
      setIsLoading(true);

      if (user) {
        const token = getTokenFromLocalStorage();
        if (!token) {
          closeModal();
          openModal("info", "Error de autenticación", "error");
          setIsLoading(false);
          return;
        }

        const cartLocal = getCartFromLocalStorage();

        try {
          const res = await getCartApi(token);
          if (res.status === "success" && res.data) {
            const cartBackend = res.data || [];
            const mergedCart = mergeCarts(cartLocal, cartBackend);

            const updatedMergedCart = await updateCartItemsWithProducts(
              mergedCart
            );

            await updateCartApi(updatedMergedCart, token);

            clearCartFromLocalStorage();
            dispatch(initCart(updatedMergedCart));
          }
        } catch (error) {
          console.error("Error:", error);
          openModal("info", "Error interno al cargar la cesta", "error");
          dispatch(initCart([]));
        }
      } else {
        const localCart = getCartFromLocalStorage();
        const updatedMergedCartLocal = await updateCartItemsWithProducts(
          localCart
        );
        dispatch(initCart(updatedMergedCartLocal));
      }

      closeModal();
      setIsLoading(false);
    };

    loadCart();
  }, [user, openModal, closeModal]);

  useEffect(() => {
    if (!user) {
      saveCartToLocalStorage(cart);
    }
  }, [cart, user]);

  const addToCartHandler = async (item: CartItem) => {
    if (user) {
      const token = getTokenFromLocalStorage();
      if (!token) {
        openModal("info", "Error de autenticación", "error");
        return;
      }

      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = cart.map((cartItem, i) =>
          i === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedCart = [...cart, item];
      }

      const updatedCartWithProducts = await updateCartItemsWithProducts(
        updatedCart
      );

      dispatch(initCart(updatedCartWithProducts));
      await updateCartApi(updatedCartWithProducts, token);
    } else {
      dispatch(addToCart(item));
    }
  };

  const removeFromCartHandler = async (
    productId: string,
    size: ProductSize,
    color: ProductColor
  ) => {
    openModal("loader");

    if (user) {
      const token = getTokenFromLocalStorage();
      if (!token) {
        closeModal();
        openModal("info", "Error de autenticación", "error");
        return;
      }

      const updatedCart = cart.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          )
      );

      const updatedCartWithProducts = await updateCartItemsWithProducts(
        updatedCart
      );

      dispatch(initCart(updatedCartWithProducts));
      await updateCartApi(updatedCartWithProducts, token);
    } else {
      dispatch(removeFromCart(productId, size, color));
    }

    closeModal();
  };

  const updateQuantityInCartHandler = async (
    productId: string,
    size: ProductSize,
    color: ProductColor,
    quantity: number
  ) => {
    if (user) {
      const token = getTokenFromLocalStorage();
      if (!token) {
        closeModal();
        openModal("info", "Error de autenticación", "error");
        return;
      }

      const updatedCart = cart.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      );

      const updatedCartWithProducts = await updateCartItemsWithProducts(
        updatedCart
      );

      dispatch(initCart(updatedCartWithProducts));
      await updateCartApi(updatedCartWithProducts, token);
    } else {
      dispatch(updateQuantityInCart(productId, size, color, quantity));
    }

    closeModal();
  };

  const clearCartHandler = async () => {
    openModal("loader");

    if (user) {
      const token = getTokenFromLocalStorage();
      if (!token) {
        closeModal();
        openModal("info", "Error de autenticación", "error");
        return;
      }
      if (token) await deleteCartApi(token);
    }

    dispatch(clearCart());
    clearCartFromLocalStorage();
    closeModal();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        updateQuantityInCart: updateQuantityInCartHandler,
        clearCart: clearCartHandler,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
