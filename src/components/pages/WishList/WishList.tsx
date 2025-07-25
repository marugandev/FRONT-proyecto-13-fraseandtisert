import "./WishList.css";

import { useEffect, useState, useCallback } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import { useFavorites } from "../../../context/Favorites/useFavorites";
import { getProductById } from "../../../api/product/getProductById";
import type { Product } from "../../../types/product/product";
import useModal from "../../../context/Modal/useModal";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { favorites, isFavoritesReady } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const loadFavorites = useCallback(async () => {
    if (favorites.length === 0) {
      setProducts([]);
      closeModal();
      return;
    }

    openModal("loader");

    try {
      const results = await Promise.all(
        favorites.map((id) => getProductById(id))
      );

      const validProducts = results
        .filter((res) => res.status === "success")
        .map((res) => res.data as Product);

      setProducts(validProducts);
    } catch (error) {
      openModal("info", "Error al cargar los favoritos", "error");
      console.error("Error:", error);
    } finally {
      closeModal();
    }
  }, [favorites, openModal, closeModal]);

  useEffect(() => {
    if (isFavoritesReady) {
      loadFavorites();
    }
  }, [isFavoritesReady, loadFavorites]);

  if (!isFavoritesReady) {
    return (
      <section className="site-whish-list">
        <h2 className="site-whish-list__title">🖤 Lista de deseos</h2>
      </section>
    );
  }

  return (
    <section className="site-whish-list">
      <h2 className="site-whish-list__title">🖤 Lista de deseos</h2>
      <div className="site-whish-list__content">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="site-whish-list__content-empty">
            <p className="site-whish-list__text-empty">
              Aún no tienes productos en tu lista de deseos.
            </p>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver atrás
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
