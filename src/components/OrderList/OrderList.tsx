import React, { useState, useEffect } from 'react';
import { getListOrder } from '../../services/orderService';
import { ListOrder } from '../../types/Order';
import { Link } from 'react-router-dom';
import './OrderList.css'; // CSS cho OrderList

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<ListOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getListOrder();
        setOrders(response);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      <h2>Danh sách đơn hàng</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId} className="order-item">
            <Link to={`/orders/${order.orderId}`} className="order-link">
              <div className="order-item-content">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Trạng thái: </strong>
                  <span className={`status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </p>
                <p><strong>Ngày cập nhật:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default OrderList;
