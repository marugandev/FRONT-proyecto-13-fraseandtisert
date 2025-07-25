import "./ProductCard.css";

import type { ProductCardProps } from "../../../types/product/product-card-props";
import { Link } from "react-router-dom";
import ProductTags from "../ProductTags/ProductTags";
import ProductCardActions from "../ProductCardActions/ProductCardActions";
import { getVariantByColor } from "../../../utils/product";

const ProductCard = ({ product, activeHover = true }: ProductCardProps) => {
  const {
    category,
    slug,
    featuredImage,
    featuredColor,
    text,
    name,
    price,
    discount,
    tags
  } = product;

  const featuredImageHover = getVariantByColor(product, featuredColor);

  return (
    <article className={`product-card ${activeHover ? "hover-active" : ""}`}>
      <div className="product-card__image-wrapper">
        <Link
          to={`/collection/${category}/${slug}`}
          className="product-card__image-link"
        >
          <img
            className="product-card__image"
            src={featuredImage}
            alt={text || name}
            loading="lazy"
          />
          {activeHover && (
            <img
              className="product-card__image-hover"
              src={featuredImageHover}
              alt={text || name}
              loading="lazy"
            />
          )}
        </Link>
        <ProductTags
          price={price}
          category={category}
          tags={tags}
          discount={discount}
        />
        <ProductCardActions product={product} />
      </div>
    </article>
  );
};

export default ProductCard;
