import "./Cart.css";

import SidebarPanel from "../SidebarPanel/SidebarPanel";
import { useCart } from "../../../context/Cart/useCart";
import CartActions from "../../molecules/CartActions/CartActions";
import { getQuantityInCart } from "../../../utils/getQuantityInCart";

const Cart = () => {
  const { cart } = useCart();

  const quantityInCart = getQuantityInCart(cart);
  const displayQuantity = quantityInCart > 99 ? "+99" : quantityInCart;

  return (
    <SidebarPanel
      triggerLabel={`Cesta ${quantityInCart > 0 ? `(${displayQuantity})` : ""}`}
      triggerClassName="cart"
      ariaLabel="Cesta de compra"
    >
      {quantityInCart === 0 ? (
        <p className="cart__info">La cesta está vacía.</p>
      ) : (
        ({ closePanel }) => <CartActions closePanel={closePanel} />
      )}
    </SidebarPanel>
  );
};

export default Cart;
