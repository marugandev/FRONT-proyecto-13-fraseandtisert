import "./AdminOrders.css";

import { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../../../utils/authLocalStorage";
import type { Order } from "../../../types/order/order";
import useModal from "../../../context/Modal/useModal";
import OrdersPanel from "../../molecules/OrdersPanel/OrdersPanel";
import { getAllUsersOrdersApi } from "../../../api/order/getAllUsersOrdersApi";

const AdminOrders = () => {
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

        const res = await getAllUsersOrdersApi(token);

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
    <section className="site-admin-orders">
      <OrdersPanel
        orders={orders}
        title={"Todos los pedidos"}
        loading={loading}
      ></OrdersPanel>
    </section>
  );
};

export default AdminOrders;
