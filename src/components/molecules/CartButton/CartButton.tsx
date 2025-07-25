import "./CartButton.css";

import type { Product } from "../../../types/product/product";
import Button from "../../atoms/Button/Button";
import { useValidatedAddToCart } from "../../../hooks/useValidatedAddToCart";
import useModal from "../../../context/Modal/useModal";

const CartButton = ({ product }: { product: Product }) => {
  const { tryAddToCart } = useValidatedAddToCart(product);
  const { openModal } = useModal();

  const defaultColor = product.featuredColor;
  const defaultSize = "L";
  const quantity = 1;

  const handleAddToCart = () => {
    const res = tryAddToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      color: defaultColor,
      size: defaultSize,
      quantity
    });

    if (res.status === "error") {
      openModal(
        "info",
        `No hay stock disponible para la talla ${defaultSize}.`,
        "warning"
      );
    } else if (res.limited) {
      openModal(
        "info",
        `Sólo se pudieron añadir ${res.addedQuantity} unidad(es) por falta de stock.`,
        "warning"
      );
    }
  };

  return (
    <Button variant="icon" action="cart" onClick={handleAddToCart}>
      <img
        src="/images/icons/cart-icon.png"
        className="button--cart__img"
        alt="Icono de carrito"
      />
    </Button>
  );
};

export default CartButton;
