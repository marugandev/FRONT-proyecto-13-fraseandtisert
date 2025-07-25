import "./ProductDetails.css";

import type { Product } from "../../../types/product/product";
import useProductDisplay from "../../../hooks/useProductDisplay";
import ProductTags from "../ProductTags/ProductTags";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import ProductDetailsActions from "../ProductDetailsActions/ProductDetailsActions";
import BreadcrumbProduct from "../BreadcrumbProduct/BreadcrumbProduct";
import { productCategoryLabels } from "../../../types/product/product-category";

const ProductDetails = ({ product }: { product: Product }) => {
  const { displayImage, changeDisplayImage } = useProductDisplay(product);

  const {
    _id,
    name,
    slug,
    variants,
    featuredImage,
    text,
    author,
    price,
    discount,
    category,
    tags
  } = product;

  return (
    <article className="product-details">
      <BreadcrumbProduct
        items={[
          { label: "Colección", to: "/collection" },
          {
            label: productCategoryLabels[category] ?? category,
            to: `/collection/${category}`
          },
          { label: slug }
        ]}
      />
      <div className="product-details__wrapper">
        <div className="product-details__image-gallery">
          <div className="product-details__image-display-wrapper">
            {_id && <FavoriteButton id={_id} />}
            <img
              className="product-details__image-display"
              src={displayImage}
              alt={name}
            />
          </div>
          <div className="product-details__thumbnails-wrapper">
            {variants.map((variant, i) => {
              const thumbnailSrc = variant?.images?.flat?.[0];
              if (!thumbnailSrc) return null;

              return (
                <img
                  key={variant.color || i}
                  className="product-details__thumbnail"
                  src={thumbnailSrc}
                  alt={`${name} - variante: ${variant.color}`}
                  onClick={() => changeDisplayImage(thumbnailSrc)}
                />
              );
            })}
            {featuredImage && (
              <img
                className="product-details__thumbnail"
                src={featuredImage}
                alt={`${name} featured`}
                onClick={() => changeDisplayImage(featuredImage)}
              />
            )}
          </div>
        </div>
        <div className="product-details__info">
          <h2 className="product-details__title">{name}</h2>
          <h3 className="product-details__text">"{text}"</h3>
          <h3 className="product-details__text-accent">{author}</h3>
          <ProductTags
            price={price}
            category={category}
            tags={tags}
            discount={discount}
          />
          <div className="product-details__actions">
            <ProductDetailsActions product={product} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetails;
