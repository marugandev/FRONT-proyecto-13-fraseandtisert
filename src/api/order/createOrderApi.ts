import { apiClient } from "../client";
import { ORDER_ENDPOINTS } from "../endpoints/order";
import type { Order } from "../../types/order/order";

export const createOrderApi = (token?: string) => {
  return apiClient<Order>({
    endpoint: ORDER_ENDPOINTS.CREATE,
    method: "POST",
    token
  });
};
