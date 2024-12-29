import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetail } from '../../services/orderService';
import { OrderDetailType } from '../../types/Order';

import './OrderDetail.css'; // CSS cho OrderDetail

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetail = async () => {
        try {
          const detail = await getOrderDetail(orderId);
          setOrderDetail(detail);
        } catch (error) {
          console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        }
      };

      fetchOrderDetail();
    }
  }, [orderId]);

  if (!orderDetail) {
    return <div className="loading">Đang tải chi tiết đơn hàng...</div>;
  }

  return (
    <div className="order-detail">
      <h2>Chi tiết đơn hàng</h2>
      <div className="order-info">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Trạng thái:</strong> {orderDetail.status}</p>
        <p><strong>Ngày tạo:</strong> {new Date(orderDetail.createdAt).toLocaleString()}</p>
        <p><strong>Ngày cập nhật:</strong> {new Date(orderDetail.updatedAt).toLocaleString()}</p>
        <p><strong>Ngày hết hạn:</strong> {new Date(orderDetail.dueDate).toLocaleString()}</p>
      </div>

      <h3>Thông tin các sách</h3>
      <ul className="order-items">

        {orderDetail.items.map((item) => (
          <Link to={`/book/${item.bookId}`} className="order-item-detail-link">
            <li key={item.bookId} className="order-item-detail">
              <p><strong>Book ID:</strong> {item.bookId}</p>
              <p><strong>Số lượng:</strong> {item.quantity}</p>
              <p><strong>Giá:</strong> {item.price}</p>
            </li>
          </Link>
        ))}

      </ul>

      <div className="order-payment">
        <p><strong>Tổng số tiền:</strong> {orderDetail.totalAmount}</p>
        <p><strong>Tiền cọc:</strong> {orderDetail.depositAmount}</p>
        <p><strong>Tiền thuê:</strong> {orderDetail.rentalAmount}</p>
        <p><strong>Phương thức thanh toán:</strong> {orderDetail.paymentMethod}</p>
      </div>
    </div>
  );
};

export default OrderDetail;
