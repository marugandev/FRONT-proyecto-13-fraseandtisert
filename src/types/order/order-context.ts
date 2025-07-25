import type { Order } from "./order";
import type { OrderItem } from "./order-item";

export type OrderContextType = {
  orders: Order[];
  handleCreateOrder: (items: OrderItem[], guestId?: string) => Promise<void>;
  handleGetAllUserOrders: () => Promise<void>;
  handleGetUserOrders: () => Promise<void>;
  isOrderLoading: boolean;
};
