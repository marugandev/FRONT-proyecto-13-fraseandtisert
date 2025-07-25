import { useState } from "react";
import { OrderContext } from "./OrderContext";
import type { Order } from "../../types/order/order";
import type { OrderItem } from "../../types/order/order-item";
import { createOrderApi } from "../../api/order/createOrderApi";
import { createOrderGuestApi } from "../../api/order/createOrderGuestApi";
import { useAuth } from "../Auth/useAuth";
import useModal from "../Modal/useModal";
import { getTokenFromLocalStorage } from "../../utils/authLocalStorage";
import { clearCartFromLocalStorage } from "../../utils/cartLocalStorage";
import { useCart } from "../Cart/useCart";
import { getUserOrdersApi } from "../../api/order/getUserOrdersApi";
import { clearGuestIdFromLocalStorage } from "../../utils/guestId";

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();
  const { clearCart } = useCart();

  const handleCreateOrder = async (items: OrderItem[], guestId?: string) => {
    openModal("loader");
    setIsOrderLoading(true);

    try {
      const token = getTokenFromLocalStorage();

      if (guestId && !user) {
        const res = await createOrderGuestApi(guestId, items);
        if (res.status === "success") {
          clearCart();
          clearCartFromLocalStorage();
          clearGuestIdFromLocalStorage();
          openModal("info", "Pedido realizado", "success");
        }
      } else if (user && token) {
        const res = await createOrderApi(token);
        if (res.status === "success") {
          clearCart();
          openModal("info", "Pedido realizado", "success");
        }
      } else {
        openModal("info", "Usuario no autenticado", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      openModal("info", "Error interno al procesar el pedido", "error");
    } finally {
      closeModal();
      setIsOrderLoading(false);
    }
  };

  const handleGetAllUserOrders = async () => {
    openModal("loader");
    setIsOrderLoading(true);

    try {
      const token = getTokenFromLocalStorage();
      if (!token || user?.role !== "admin") {
        openModal("info", "No autenticado", "error");
        return;
      }

      const res = await getUserOrdersApi(token);
      if (res.status === "success") {
        setOrders(res.data);
      }
    } catch (error) {
      console.error("Error:", error);
      openModal("info", "Error interno al obtener los pedidos", "error");
    } finally {
      closeModal();
      setIsOrderLoading(false);
    }
  };

  const handleGetUserOrders = async () => {
    openModal("loader");
    setIsOrderLoading(true);

    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        openModal("info", "No autenticado", "error");
        return;
      }

      const res = await getUserOrdersApi(token);
      if (res.status === "success") {
        setOrders(res.data);
      }
    } catch (error) {
      console.error("Error:", error);
      openModal("info", "Error interno al obtener el pedido", "error");
    } finally {
      closeModal();
      setIsOrderLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        handleCreateOrder,
        handleGetAllUserOrders,
        handleGetUserOrders,
        isOrderLoading
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
