const USER_ID_KEY = "userId";
const TOKEN_KEY = "token";

export const saveAuthToLocalStorage = (userId: string, token: string) => {
  localStorage.setItem(USER_ID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthFromLocalStorage = () => {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserIdFromLocalStorage = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};
