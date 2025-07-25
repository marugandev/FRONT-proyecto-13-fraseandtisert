export const USER_ENDPOINTS = {
  GET_BY_ID: (id: string) => `/users/${id}`,
  GET_ALL: "/users",
  PUT: (id: string) => `/users/${id}`,
  DELETE: (id: string) => `/users/${id}`
};
