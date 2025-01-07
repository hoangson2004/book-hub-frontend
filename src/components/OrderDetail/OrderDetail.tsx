import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderDetail, cancelOrder } from '../../services/orderService';
import { OrderDetailType } from '../../types/Order';

import './OrderDetail.css'; // CSS cho OrderDetail

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();

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

  const handleCancelOrder = async () => {
    if (orderId && window.confirm('Bạn có chắc muốn hủy đơn hàng này không?')) {
      setIsCancelling(true);
      try {
        await cancelOrder(orderId);
        alert('Đơn hàng đã được hủy thành công.');
        navigate('/orders/history'); // Điều hướng về danh sách đơn hàng
      } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
        alert('Không thể hủy đơn hàng. Vui lòng thử lại.');
      } finally {
        setIsCancelling(false);
      }
    }
  };

  if (!orderDetail) {
    return <div className="loading">Đang tải chi tiết đơn hàng...</div>;
  }

  const isPending = orderDetail.status === 'Pending';

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
          <Link to={`/book/${item.bookId}`} className="order-item-detail-link" key={item.bookId}>
            <li className="order-item-detail">
              <p><strong>Book ID:</strong> {item.bookId}</p>
              <p><strong>Số lượng:</strong> {item.quantity}</p>
              <p><strong>Giá:</strong> {item.price}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div className="order-payment">
        <p><strong>Tổng số tiền:</strong> {orderDetail.totalAmount.toFixed(2)}</p>
        <p><strong>Tiền cọc:</strong> {orderDetail.depositAmount.toFixed(2)}</p>
        <p><strong>Tiền thuê:</strong> {orderDetail.rentalAmount.toFixed(2)}</p>
        <p><strong>Phương thức thanh toán:</strong> {orderDetail.paymentMethod}</p>
      </div>

      <div className="cancel-order-button-container">
        <button
          onClick={isPending ? handleCancelOrder : undefined}
          disabled={!isPending || isCancelling}
          className="cancel-order-button"
        >
          {isCancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
