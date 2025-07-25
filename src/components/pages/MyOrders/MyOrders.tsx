import { useEffect, useState } from "react";
import { getUserOrdersApi } from "../../../api/order/getUserOrdersApi";
import { getTokenFromLocalStorage } from "../../../utils/authLocalStorage";
import "./MyOrders.css";

import type { Order } from "../../../types/order/order";
import useModal from "../../../context/Modal/useModal";
import OrdersPanel from "../../molecules/OrdersPanel/OrdersPanel";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setIsLoading] = useState(true);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const handleGetOrders = async () => {
      setIsLoading(true);
      openModal("loader");
      try {
        const token = getTokenFromLocalStorage();
        if (!token) return;

        const res = await getUserOrdersApi(token);

        if (res.status === "success") {
          setOrders(res.data);
          setIsLoading(false);
          closeModal();
        } else {
          console.error("Error:", res.message);
          setOrders([]);
          setIsLoading(false);
          closeModal();
        }
      } catch (error) {
        console.error("Error:", error);
        setOrders([]);
        setIsLoading(false);
        closeModal();
      }
    };
    handleGetOrders();
  }, [openModal, closeModal]);

  return (
    <section className="site-my-orders">
      <OrdersPanel orders={orders} loading={loading}></OrdersPanel>
    </section>
  );
};

export default MyOrders;
