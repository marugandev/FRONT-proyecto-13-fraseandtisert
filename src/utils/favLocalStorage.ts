const FAVORITE_KEY = "favorites";

export const getFavoritesFromLocalStorage = (): string[] => {
  try {
    const res = localStorage.getItem(FAVORITE_KEY);
    const parsed = res ? JSON.parse(res) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveFavoritesToLocalStorage = (favorites: string[]) => {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
};

export const clearFavoritesFromLocalStorage = () => {
  localStorage.removeItem(FAVORITE_KEY);
};
