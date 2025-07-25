import { apiClient } from "../client";
import type { LoginReq, LoginRes } from "../../types/auth/login";
import { AUTH_ENDPOINTS } from "../endpoints/auth";

export const loginApi = (data: LoginReq) => {
  return apiClient<LoginRes, LoginReq>({
    endpoint: AUTH_ENDPOINTS.LOGIN,
    method: "POST",
    body: data
  });
};
