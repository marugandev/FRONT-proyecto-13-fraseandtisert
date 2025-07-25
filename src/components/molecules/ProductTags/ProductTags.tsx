import "./ProductTags.css";

import type { ProductTagsProps } from "../../../types/product/product-tags-props";

import Tag from "../../atoms/Tag/Tag";
import { productCategoryLabels } from "../../../types/product/product-category";
import { productTagLabels } from "../../../types/product/product-tag";

const ProductTags = ({ price, category, tags, discount }: ProductTagsProps) => {
  return (
    <div className="product-tags">
      <Tag variant="price">{price}€</Tag>
      {discount && <Tag variant="discount">-{discount}%</Tag>}
      <Tag variant="category">
        {category !== undefined ? productCategoryLabels[category] : null}
      </Tag>
      {tags?.map((tag, i) => (
        <Tag variant="badge" key={i}>
          {productTagLabels[tag]}
        </Tag>
      ))}
    </div>
  );
};

export default ProductTags;
