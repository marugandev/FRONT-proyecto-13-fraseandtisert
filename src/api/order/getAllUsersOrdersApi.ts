import type { Order } from "./../../types/order/order";
import { apiClient } from "../client";
import { ORDER_ENDPOINTS } from "../endpoints/order";

export const getAllUsersOrdersApi = (token?: string) => {
  return apiClient<Order[]>({
    endpoint: ORDER_ENDPOINTS.GET_ALL,
    method: "GET",
    token
  });
};
