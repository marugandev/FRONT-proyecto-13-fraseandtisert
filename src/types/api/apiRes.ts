export type ApiResSuccess<T> = {
  status: "success";
  message: string;
  data: T;
};

export type ApiResError = {
  status: "error";
  message: string;
  errorMessage?: string;
};

export type ApiRes<T> = ApiResSuccess<T> | ApiResError;
