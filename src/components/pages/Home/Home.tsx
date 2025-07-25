import "./Home.css";

import HeroVideo from "../../atoms/HeroVideo/HeroVideo";
import Carousel from "../../molecules/Carousel/Carousel";
import PosterColecction from "../../molecules/PosterColecction/PosterColecction";
import RecicledSection from "../../molecules/RecycledSection/RecycledSection";
import { useState, useEffect } from "react";
import type { Product } from "../../../types/product/product";
import useModal from "../../../context/Modal/useModal";
import { getProducts } from "../../../api/product/getProducts";

const Home = () => {
  const { openModal, closeModal } = useModal();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        openModal("loader");
        const res = await getProducts();
        if (res.status === "success") {
          setProducts(res.data);
          closeModal();
        }
      } catch (error) {
        openModal(
          "info",
          error instanceof Error ? error.message : "Error desconocido",
          "error"
        );
      }
    };

    handleGetProducts();
  }, [openModal, closeModal]);

  return (
    <section className="site-home">
      <HeroVideo />
      <Carousel products={products} />
      <div className="site-home__collection-container">
        <PosterColecction />
        <RecicledSection />
      </div>
    </section>
  );
};

export default Home;
