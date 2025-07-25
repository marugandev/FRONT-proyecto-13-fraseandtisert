import "./Product.css";

import ProductDetails from "../../molecules/ProductDetails/ProductDetails";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useModal from "../../../context/Modal/useModal";
import type { Product as ProductType } from "../../../types/product/product";
import { getProductBySlug } from "../../../api/product/getProductBySlug";

const Product = () => {
  const { productSlug } = useParams<{ productSlug: string }>();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const handleGetProductBySlug = async () => {
      if (!productSlug) return;

      try {
        openModal("loader");

        const res = await getProductBySlug(productSlug);

        if (res.status === "success") {
          setProduct(res.data);
        } else {
          openModal("info", res.message || "Error desconocido", "error");
        }

        setIsFetched(true);
        closeModal();
      } catch (error) {
        closeModal();
        setIsFetched(true);
        openModal(
          "info",
          error instanceof Error ? error.message : "Error desconocido",
          "error"
        );
      }
    };

    handleGetProductBySlug();
  }, [productSlug, openModal, closeModal]);

  if (isFetched && !product) return <Navigate to="/not-found" replace />;

  if (!product) return null;

  return (
    <section className="site-product">
      <ProductDetails product={product} />
    </section>
  );
};

export default Product;
