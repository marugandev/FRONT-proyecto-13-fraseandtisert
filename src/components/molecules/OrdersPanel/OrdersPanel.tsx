import "./OrdersPanel.css";
import type { OrdersPanelProps } from "../../../types/order/orders-panel";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button";

const OrdersPanel = ({
  orders,
  title = "Mis Pedidos",
  loading
}: OrdersPanelProps) => {
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="order-panel">
        <h2 className="order-panel__title">{title}</h2>
      </div>
    );

  if (!orders.length)
    return (
      <div className="order-panel">
        <h2 className="order-panel__title">{title}</h2>
        <p className="order-panel__text-info">No hay pedidos</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Volver atrás
        </Button>
      </div>
    );

  return (
    <div className="order-panel">
      <h2 className="order-panel__title">{title}</h2>
      <table className="my-orders__table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Número</th>
            <th>Estado</th>
            <th>Productos</th>
            <th>Imagen</th>
            <th>Total (€)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : ""}
              </td>
              <td>{order._id.slice(-6).toUpperCase()}</td>
              <td>{order.status}</td>
              <td>{order.items?.[0].quantity}</td>
              <td>
                <img
                  className="order-panel__img"
                  src={order.items?.[0].featuredImage}
                  alt=""
                />
              </td>
              <td>{order.totalAmount.toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPanel;
