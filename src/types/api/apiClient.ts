export type ApiClient<B = unknown> = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
  headers?: Record<string, string>;
  token?: string;
  isJSON?: boolean;
};
