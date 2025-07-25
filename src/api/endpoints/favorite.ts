export const FAVORITE_ENDPOINTS = {
  GET_ALL: "/favorites",
  ADD: (productId: string) => `/favorites/${productId}`,
  DELETE: (productId: string) => `/favorites/${productId}`
};
