import type { Order } from "./order";

export type OrdersPanelProps = {
  orders: Order[];
  title?: string;
  loading: boolean;
};
