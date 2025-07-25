import "./ProductCardActions.css";

import type { Product } from "../../../types/product/product";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import CartButton from "../CartButton/CartButton";

const ProductCardActions = ({ product }: { product: Product }) => {
  return (
    <div className="product-card__actions">
      <FavoriteButton id={product._id} />
      <CartButton product={product} />
    </div>
  );
};

export default ProductCardActions;
