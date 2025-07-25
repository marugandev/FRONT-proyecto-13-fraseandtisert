import { apiClient } from "../client";
import type { User } from "../../types/auth/user";
import { USER_ENDPOINTS } from "../endpoints/user";

export const putUser = (
  id: string,
  data: Partial<User> | FormData,
  token: string
) => {
  const isFormData = data instanceof FormData;

  return apiClient<User>({
    endpoint: USER_ENDPOINTS.PUT(id),
    method: "PUT",
    body: data,
    token,
    isJSON: !isFormData
  });
};
