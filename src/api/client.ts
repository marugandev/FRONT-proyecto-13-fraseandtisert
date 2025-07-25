import { API_BASE_URL } from "../config/apiConfig";
import type { ApiClient } from "./../types/api/apiClient";
import type { ApiRes } from "./../types/api/apiRes";

export const apiClient = async <T = unknown, B = unknown>({
  endpoint,
  method = "GET",
  body,
  headers = {},
  token,
  isJSON = true
}: ApiClient<B>): Promise<ApiRes<T>> => {
  try {
    const combinedHeaders = {
      ...(isJSON &&
        !(body instanceof FormData) && {
          "Content-Type": "application/json"
        }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers
    };

    const processedBody =
      body && isJSON && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as BodyInit | null | undefined);

    const res = await fetch(API_BASE_URL + endpoint, {
      method,
      headers: combinedHeaders,
      body: processedBody
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    const jsonBody = isJson ? await res.json() : null;

    if (!res.ok) {
      return {
        status: "error",
        message: jsonBody?.message || "Error desconocido",
        errorMessage: jsonBody?.errorMessage
      };
    }

    return {
      status: "success",
      message: jsonBody?.message || "Operación con éxito",
      data: jsonBody?.data as T
    };
  } catch (error: unknown) {
    let errorMessage = "Desconocido";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message?: string }).message ?? "Desconocido";
    }
    return {
      status: "error",
      message: "Error inesperado de conexión o formato",
      errorMessage
    };
  }
};
