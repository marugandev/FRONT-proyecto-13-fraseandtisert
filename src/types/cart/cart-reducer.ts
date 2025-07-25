import type { CartItem } from "./cart-item";
import type { CartAction } from "../../actions/cart-actions";

export type CartReducerType = (
  state: CartItem[],
  action: CartAction
) => CartItem[];
