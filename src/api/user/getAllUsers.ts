import { apiClient } from "../client";
import type { User } from "../../types/auth/user";
import { USER_ENDPOINTS } from "../endpoints/user";

export const getAllUsers = (token: string) => {
  return apiClient<User[]>({
    endpoint: USER_ENDPOINTS.GET_ALL,
    token
  });
};
