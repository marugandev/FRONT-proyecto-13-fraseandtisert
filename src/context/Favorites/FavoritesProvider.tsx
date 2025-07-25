import { useEffect, useMemo, useState, useCallback } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { useAuth } from "../Auth/useAuth";
import { getTokenFromLocalStorage } from "../../utils/authLocalStorage";
import { getFavorites } from "../../api/favorite/getFavorites";
import { addFavorite } from "../../api/favorite/addFavorite";
import { deleteFavorite } from "../../api/favorite/deleteFavorite";
import {
  getFavoritesFromLocalStorage,
  saveFavoritesToLocalStorage,
  clearFavoritesFromLocalStorage
} from "../../utils/favLocalStorage";
import useModal from "../Modal/useModal";

export const FavoritesProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesReady, setIsFavoritesReady] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleGetFavourites = async () => {
      setIsFavoritesReady(false);

      const localFavs = getFavoritesFromLocalStorage();

      if (!user) {
        setFavorites((prev) =>
          JSON.stringify(prev) !== JSON.stringify(localFavs) ? localFavs : prev
        );
        setIsFavoritesReady(true);
        return;
      }

      const token = getTokenFromLocalStorage();
      if (!token) {
        setIsFavoritesReady(true);
        return;
      }

      const res = await getFavorites(token);
      const backendFavs =
        res.status === "success" ? res.data.map((p) => p._id) : [];

      const toAdd = localFavs.filter((id) => !backendFavs.includes(id));
      if (toAdd.length > 0) {
        await Promise.all(toAdd.map((id) => addFavorite(id, token)));
      }

      clearFavoritesFromLocalStorage();

      const merged = [...new Set([...backendFavs, ...toAdd])];
      setFavorites((prev) =>
        JSON.stringify(prev) !== JSON.stringify(merged) ? merged : prev
      );
      setIsFavoritesReady(true);
    };

    handleGetFavourites();
  }, [user]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const token = getTokenFromLocalStorage();

      setFavorites((prev) => {
        const exists = prev.includes(id);
        const updated = exists
          ? prev.filter((favId) => favId !== id)
          : [...prev, id];

        if (!user) {
          saveFavoritesToLocalStorage(updated);
        }

        (async () => {
          if (user && token) {
            try {
              if (exists) await deleteFavorite(id, token);
              else await addFavorite(id, token);
            } catch (error) {
              openModal("info", "Error al sincronizar el favorito", "error");
              console.error("Error al sincronizar el favorito:", error);
            }
          }
        })();

        return updated;
      });
    },
    [user, openModal]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const contextValueFavMemo = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      isFavoritesReady
    }),
    [favorites, toggleFavorite, isFavorite, isFavoritesReady]
  );

  return (
    <FavoritesContext.Provider value={contextValueFavMemo}>
      {children}
    </FavoritesContext.Provider>
  );
};
