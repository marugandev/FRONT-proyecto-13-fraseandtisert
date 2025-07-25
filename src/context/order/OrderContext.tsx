import { createContext } from "react";
import type { OrderContextType } from "../../types/order/order-context";

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  handleCreateOrder: async () => {},
  handleGetAllUserOrders: async () => {},
  handleGetUserOrders: async () => {},
  isOrderLoading: false
});
