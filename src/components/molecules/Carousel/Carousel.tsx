import "./Carousel.css";

import type { Product } from "../../../types/product/product";
import ProductCard from "../ProductCard/ProductCard";

const Carousel = ({ products = [] }: { products: Product[] }) => {
  return (
    <ul className="carousel" role="list" aria-label="Galería de camisetas">
      {products.map((product) => (
        <li key={product._id} className="carousel-item" role="listitem">
          <ProductCard product={product} activeHover={false} />
        </li>
      ))}
    </ul>
  );
};

export default Carousel;
