import type { CartItem } from "../types/cart/cart-item";
import type { OrderItem } from "../types/order/order-item";

const mapCartToOrderItems = (cart: CartItem[]): OrderItem[] =>
  cart.map((item) => ({
    productId: item.productId,
    name: item.name,
    slug: item.slug || "",
    featuredImage: item.featuredImage,
    price: item.price,
    color: item.color,
    size: item.size,
    quantity: item.quantity
  }));

export default mapCartToOrderItems;
