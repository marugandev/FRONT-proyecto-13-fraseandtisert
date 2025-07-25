import "./Collection.css";

import ProductCard from "../../molecules/ProductCard/ProductCard";
import { Navigate, useParams } from "react-router-dom";
import { productCategoryLabels } from "../../../types/product/product-category";
import { isValidCategory } from "../../../utils/isValidCategory";
import BreadcrumbProduct from "../../molecules/BreadcrumbProduct/BreadcrumbProduct";
import { useEffect, useState } from "react";
import useModal from "../../../context/Modal/useModal";
import type { Product } from "../../../types/product/product";
import { getProducts } from "../../../api/product/getProducts";

const Collection = () => {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        openModal("loader");

        const res = await getProducts(category);

        if (res.status === "success") {
          setProducts(res.data);
        } else {
          openModal("info", res.message || "Error desconocido", "error");
        }

        closeModal();
      } catch (error) {
        openModal(
          "info",
          error instanceof Error ? error.message : "Error desconocido",
          "error"
        );
      }
    };

    handleGetProducts();
  }, [category, openModal, closeModal]);

  if (category && !isValidCategory(category))
    return <Navigate to="/not-found" replace />;

  const categoryLabel = category
    ? productCategoryLabels[category as keyof typeof productCategoryLabels]
    : undefined;

  return (
    <section className="site-collection">
      <BreadcrumbProduct
        items={[
          {
            label: "Colección",
            to: "/collection"
          },
          ...(categoryLabel
            ? [
                {
                  label: categoryLabel
                }
              ]
            : [])
        ]}
      />
      <div className="site-collection__content">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Collection;
