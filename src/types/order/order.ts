import type { OrderItem } from "./order-item";

export type Order = {
  _id: string;
  userId?: string;
  guestId?: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress?: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paidAt?: string | Date;
  createdAt?: string | Date;
};
