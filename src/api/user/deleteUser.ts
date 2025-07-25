import { apiClient } from "../client";
import type { User } from "../../types/auth/user";
import { USER_ENDPOINTS } from "../endpoints/user";

export const deleteUser = (id: string, token: string) => {
  return apiClient<User>({
    endpoint: USER_ENDPOINTS.DELETE(id),
    method: "DELETE",
    token
  });
};
