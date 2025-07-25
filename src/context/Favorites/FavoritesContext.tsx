import { createContext } from "react";
import type { FavoriteContextType } from "../../types/context/favorite-context";

export const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined
);
