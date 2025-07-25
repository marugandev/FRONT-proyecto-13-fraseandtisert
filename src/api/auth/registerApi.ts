import { apiClient } from "../client";
import type { RegisterReq, RegisterRes } from "../../types/auth/register";
import { AUTH_ENDPOINTS } from "../endpoints/auth";

export const registerApi = (data: RegisterReq) => {
  return apiClient<RegisterRes, RegisterReq>({
    endpoint: AUTH_ENDPOINTS.REGISTER,
    method: "POST",
    body: data
  });
};
