import "./FavoriteButton.css";

import { useFavorites } from "../../../context/Favorites/useFavorites";
import Button from "../../atoms/Button/Button";

const FavoriteButton = ({ id }: { id: string }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <Button
      variant="icon"
      action="favorite"
      active={favorite}
      onClick={() => toggleFavorite(id)}
      aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-pressed={favorite}
    >
      <img
        src={
          favorite
            ? "/images/icons/heart-fill-icon.png"
            : "/images/icons/heart-icon.png"
        }
        className="button--favorite__img"
        alt=""
        aria-hidden="true"
      />
    </Button>
  );
};

export default FavoriteButton;
