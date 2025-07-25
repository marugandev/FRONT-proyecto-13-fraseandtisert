import "./BreadcrumbProduct.css";

import type { BreadcrumbItem } from "../../../types/breadcrumb-item";
import { Link } from "react-router-dom";

const BreadcrumbProduct = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="breadcrumb-product">
      <ul className="breadcrumb-product__list">
        {items.map(({ label, to }, i) => {
          const isLastItem = i === items.length - 1;

          return (
            <li key={i} className="breadcrumb-product__item">
              {!isLastItem && to ? (
                <>
                  <Link to={to} className="breadcrumb-product__link">
                    {label}
                  </Link>
                  <span className="breadcrumb-product__separator">
                    {" "}
                    {" > "}{" "}
                  </span>
                </>
              ) : (
                <>
                  <span className="breadcrumb-product__link-current">
                    {label}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadcrumbProduct;
