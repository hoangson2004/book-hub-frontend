import React, { useState, useEffect } from 'react';
import { useCart } from '../../provider/CartContext';
import { CreateOrder } from '../../types/Order';
import { createOrderApi } from '../../services/orderService';
import { getBookById } from '../../services/bookService';
import { Link } from 'react-router-dom';
import './CreateOrder.css'

const CreateOrderPage: React.FC = () => {
  const { cart, loading, error, handleRemove, handleUpdate, fetchCart } = useCart();
  const [createOrderData, setCreateOrderData] = useState<CreateOrder | null>(null);
  const [dueDate, setDueDate] = useState<string>(''); // Ngày đến hạn
  const [paymentMethod, setPaymentMethod] = useState<string>('Coin'); // Phương thức thanh toán
  const [totalPrice, setTotalPrice] = useState<number>(0); // Tổng giá sách
  const [deposit, setDeposit] = useState<number>(0); // Tiền cọc
  const [rentalFee, setRentalFee] = useState<number>(0); // Tiền thuê
  const [totalAmount, setTotalAmount] = useState<number>(0); // Tiền tổng
  const [bookDetails, setBookDetails] = useState<any[]>([]); // Dữ liệu chi tiết sách
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // Hiển thị modal xác nhận

  useEffect(() => {
    if (cart && cart.length > 0) {
      const orderItems = cart.map((item) => item.bookId);

      Promise.all(orderItems.map(async (bookId) => {
        const bookData = await getBookById(bookId);
        return bookData;
      })).then((books) => {
        setBookDetails(books);
        calculateTotal(cart);
      }).catch(error => console.error("Lỗi khi lấy thông tin sách", error));
    }

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 15);
    setDueDate(defaultDate.toISOString().split('T')[0]);
  }, [cart]);

  useEffect(() => {
    if (dueDate && cart.length > 0) {
      calculateTotal(cart);
    }
  }, [dueDate, cart]);

  const calculateTotal = (items: any[]) => {
    let total = 0;
    items.forEach(item => {
      const bookPrice = item.price;
      total += bookPrice * item.quantity;
    });

    const depositAmount = total;
    const rentalAmount = total * 0.02 * (new Date(dueDate).getDate() || 1);
    const totalAmount = depositAmount + rentalAmount;

    setTotalPrice(Number(total.toFixed(2)));
    setDeposit(Number(depositAmount.toFixed(2)));
    setRentalFee(Number(rentalAmount.toFixed(2)));
    setTotalAmount(Number(totalAmount.toFixed(2)));
  };

  const handleSubmitOrder = async () => {
    if (!cart.length) {
      alert('Giỏ hàng rỗng, không thể tạo đơn hàng.');
      return;
    }

    const orderData: CreateOrder = {
      items: cart.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.price,
      })),
      dueDate,
      paymentMethod,
    };

    setCreateOrderData(orderData);
    if (createOrderData) {
      try {
        const response = await createOrderApi(createOrderData);
        console.log('Đơn hàng đã được tạo:', response);
        alert('Đơn hàng đã được tạo thành công!');
        window.location.href = '/';
      } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
      }
    }
  };

  const handleRemoveItem = (bookId: string) => {
    handleRemove(bookId);
  };

  const handleIncreaseQuantity = (bookId: string, stock: number, quantity: number) => {
    if (quantity < stock) {
      handleUpdate(bookId, quantity + 1);
    }
  };

  const handleDecreaseQuantity = (bookId: string, quantity: number) => {
    if (quantity > 1) {
      handleUpdate(bookId, quantity - 1);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    handleSubmitOrder();
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="create-order-page">
      <h2>Tạo đơn hàng</h2>
      {cart.length > 0 ? (
        <div>
          <div>
            <h3>Giỏ hàng:</h3>
            {/* Dòng tiêu đề */}
            <div className="cart-item-header-order">
              <div><strong></strong></div>
              <div><strong>Tên sách</strong></div>
              <div><strong>Giá sách</strong></div>
              <div><strong>Giá thuê/ngày</strong></div>
              <div><strong>Số lượng</strong></div>
              <div><strong>Thao tác</strong></div>
            </div>
            {cart.map((item, index) => {
              const book = bookDetails[index];
              return (
                <div key={item.bookId} className="cart-item-order">
                  <div>
                    <Link to={`/book/${item.bookId}`}>
                      <img src={book?.imageUrl} alt={book?.title} />
                    </Link>
                  </div>
                  <div className="cart-item-details-order">
                    <Link to={`/book/${item.bookId}`}>
                      <p><strong>{book?.title}</strong></p>
                    </Link>
                  </div>
                  <div className="cart-item-price-order">
                    <p>{book?.price} Coin</p>
                  </div>
                  <div className="cart-item-rental-order">
                    <p>{(book?.price * 0.02).toFixed(2)} Coin</p>
                  </div>
                  <div className="cart-item-quantity-order">
                    <button onClick={() => handleDecreaseQuantity(item.bookId, item.quantity)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.bookId, book?.stock, item.quantity)}>+</button>
                  </div>
                  <div className="cart-item-actions-order">
                    <button onClick={() => handleRemoveItem(item.bookId)}>Xóa</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-summary">
            <div className="payment-info-order">
              <div>
                <label>Ngày đến hạn:</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div>
                <label>Phương thức thanh toán:</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="Coin">Coin</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>
            <h2>Tổng giá trị đơn hàng</h2>
            <p><strong>Tổng giá sách: </strong>{totalPrice} Coin</p>
            <p><strong>Tiền cọc: </strong>{deposit} Coin</p>
            <p><strong>Tiền thuê: </strong>{rentalFee} Coin</p>
            <p><strong>Tổng tiền: </strong><span className="total">{totalAmount} Coin</span></p>

            <button onClick={handleConfirmation}>Tạo đơn hàng</button>
          </div>
        </div>
      ) : (
        <p>Giỏ hàng của bạn trống.</p>
      )}

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Bạn có chắc chắn với thông tin giỏ hàng không?</p>
            <button onClick={handleConfirmOrder}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );



};

export default CreateOrderPage;
