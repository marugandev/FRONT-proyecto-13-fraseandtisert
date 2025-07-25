export type FavoriteContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isFavoritesReady: boolean;
};
