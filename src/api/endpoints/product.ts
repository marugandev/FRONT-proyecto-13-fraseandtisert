export const PRODUCT_ENDPOINTS = {
  GET_ALL: "/products",
  GET_BY_CATEGORY: (category: string) => `/products?category=${category}`,
  GET_BY_ID: (id: string) => `/products/by-id/${id}`,
  GET_BY_IDS: "/products/by-ids",
  GET_BY_SLUG: (slug: string) => `/products/${slug}`,
  CREATE: "/products",
  UPDATE: (id: string) => `/products/${id}`,
  DELETE: (id: string) => `/products/${id}`
};
