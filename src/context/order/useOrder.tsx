import { useContext } from "react";
import { OrderContext } from "./OrderContext";

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder debe usarse dentro de CartProvider");
  return context;
};
