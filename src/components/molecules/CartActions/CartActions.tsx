import "./CartActions.css";

import { useCart } from "../../../context/Cart/useCart";
import QuantitySelector from "../../molecules/QuantitySelector/QuantitySelector";
import Button from "../../atoms/Button/Button";
import { getQuantityInCart } from "../../../utils/getQuantityInCart";
import { getTotalPriceInCart } from "../../../utils/getTotalPriceInCart";
import { getCartItemPricing } from "../../../utils/getCartItemPricing";
import { getStockInfoFromProduct } from "../../../utils/getStockInfoFromProduct";
import { Link } from "react-router-dom";
import { productColorLabel } from "../../../types/product/product-color";
import useModal from "../../../context/Modal/useModal";
import { useOrder } from "../../../context/order/useOrder";
import mapCartToOrderItems from "../../../utils/mapCartToOrderItems";
import { createGuestIdInLocalStorage } from "../../../utils/guestId";
import { useAuth } from "../../../context/Auth/useAuth";

const CartActions = ({ closePanel }: { closePanel: () => void }) => {
  const { cart, clearCart, updateQuantityInCart, removeFromCart } = useCart();
  const { openModal } = useModal();
  const { handleCreateOrder } = useOrder();
  const { user } = useAuth();

  const quantityInCart = getQuantityInCart(cart);
  const displayQuantity = quantityInCart > 99 ? "+99" : quantityInCart;
  const totalPrice = getTotalPriceInCart(cart);

  return (
    <section className="cart-actions" aria-label="Contenido de la cesta">
      <div className="cart-actions__title-container">
        <h3 className="cart-actions__title">{`Cesta ${
          quantityInCart > 0 ? `(${displayQuantity})` : ""
        }`}</h3>
        <Button
          variant="primary"
          action="delete"
          onClick={() =>
            openModal(
              "confirm",
              "¿Seguro que deseas eliminar todos los productos de la cesta?",
              "warning",
              () => clearCart()
            )
          }
          aria-label={"Eliminar todos los productos de la cesta"}
        >
          Eliminar cesta
        </Button>
      </div>

      <ul className="cart-actions__list">
        {cart.map((item) => {
          const {
            productId,
            color,
            size,
            quantity,
            product,
            slug,
            category,
            featuredImage,
            name,
            price,
            discount
          } = item;

          if (!product) return null;

          const { subtotalPrice } = getCartItemPricing({
            discount,
            price,
            quantity
          });

          const { finalStock } = getStockInfoFromProduct(
            product,
            cart,
            color,
            size,
            true
          );

          return (
            <li
              key={`${productId}-${color}-${size}`}
              className="cart-actions__item"
            >
              <Link
                className="cart-actions__link"
                to={`/collection/${category}/${slug}`}
              >
                <img
                  src={featuredImage}
                  alt={name}
                  className="cart-actions__image"
                  loading="lazy"
                  onClick={closePanel}
                />
              </Link>

              <div className="cart-actions__info">
                <Link
                  className="cart-actions__link"
                  to={`/collection/${category}/${slug}`}
                  onClick={closePanel}
                >
                  <h4 className="cart-actions__title-item">{name}</h4>
                </Link>

                <dl className="cart-actions__details">
                  <div className="cart-actions__details-item">
                    <dt className="cart-actions__details-label">Color:</dt>
                    <dd className="cart-actions__details-value">
                      {productColorLabel[color]}
                    </dd>
                  </div>
                  <div className="cart-actions__details-item">
                    <dt className="cart-actions__details-label">Talla:</dt>
                    <dd className="cart-actions__details-value">{size}</dd>
                  </div>
                  <div className="cart-actions__details-item">
                    <dt className="cart-actions__details-label">Precio (u):</dt>
                    <dd className="cart-actions__details-value">
                      {price.toFixed(2)}€
                    </dd>
                  </div>
                  {discount && (
                    <div className="cart-actions__details-item">
                      <dt className="cart-actions__details-label">
                        Descuento:
                      </dt>
                      <dd className="cart-actions__details-value">
                        -{discount}%
                      </dd>
                    </div>
                  )}
                  <div className="cart-actions__details-item">
                    <dt className="cart-actions__details-label">Subtotal:</dt>
                    <dd className="cart-actions__details-value">
                      {subtotalPrice.toFixed(2)}€
                    </dd>
                  </div>

                  <QuantitySelector
                    value={quantity}
                    onIncrement={() => {
                      if (quantity < finalStock) {
                        updateQuantityInCart(
                          productId,
                          size,
                          color,
                          quantity + 1
                        );
                      } else {
                        openModal(
                          "info",
                          "No hay más stock disponible.",
                          "error"
                        );
                      }
                    }}
                    onDecrement={() => {
                      const newQty = Math.max(1, quantity - 1);
                      updateQuantityInCart(productId, size, color, newQty);
                    }}
                    disableIncrement={quantity >= finalStock}
                    disableDecrement={quantity <= 1}
                  />
                </dl>
              </div>

              <Button
                variant="primary"
                action="delete"
                onClick={() =>
                  openModal(
                    "confirm",
                    "¿Seguro que deseas eliminar el producto?",
                    "warning",
                    () => removeFromCart(productId, size, color)
                  )
                }
                aria-label={`Eliminar producto - ${name} color ${color} talla ${size}`}
              >
                Eliminar
              </Button>
            </li>
          );
        })}

        <div className="cart-actions__purchase-summary">
          <div className="cart-actions__purchase-summary-item">
            <dt className="cart-actions__purchase-summary-label">
              Total cantidad:
            </dt>
            <dd className="cart-actions__purchase-summary-value">
              {quantityInCart}
            </dd>
          </div>
          <div className="cart-actions__purchase-summary-item">
            <dt className="cart-actions__purchase-summary-label">
              Total precio:
            </dt>
            <dd className="cart-actions__purchase-summary-value">
              {totalPrice.toFixed(2)}€
            </dd>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              const items = mapCartToOrderItems(cart);

              if (user) {
                handleCreateOrder(items);
              } else {
                const guestId = createGuestIdInLocalStorage();
                handleCreateOrder(items, guestId);
              }
              closePanel();
            }}
          >
            Comprar
          </Button>
        </div>
      </ul>
    </section>
  );
};

export default CartActions;
