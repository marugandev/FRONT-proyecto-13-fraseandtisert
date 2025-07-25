import { apiClient } from "../client";
import { AUTH_ENDPOINTS } from "../endpoints/auth";

export const verifyTokenApi = async (token: string) => {
  return apiClient({
    endpoint: AUTH_ENDPOINTS.VERIFY_JWT,
    method: "GET",
    token
  });
};
