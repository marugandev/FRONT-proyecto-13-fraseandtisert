import type { Order } from "./../../types/order/order";
import { apiClient } from "../client";
import { ORDER_ENDPOINTS } from "../endpoints/order";

export const getUserOrdersApi = (token?: string) => {
  return apiClient<Order[]>({
    endpoint: ORDER_ENDPOINTS.GET_USER_ORDERS,
    method: "GET",
    token
  });
};
