import type { OrderItem } from "../../types/order/order-item";
import { apiClient } from "../client";
import { ORDER_ENDPOINTS } from "../endpoints/order";
import type { Order } from "../../types/order/order";

export const createOrderGuestApi = (guestId: string, items: OrderItem[]) => {
  return apiClient<Order>({
    endpoint: ORDER_ENDPOINTS.CREATE_GUEST,
    method: "POST",
    body: { guestId, items }
  });
};
