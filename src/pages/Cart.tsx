import React, { useState } from 'react';

const Cart: React.FC = () => {
  // Định nghĩa trực tiếp kiểu dữ liệu Book
  interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    description: string;
  }

  const [cart, setCart] = useState<Book[]>([]);

  const removeFromCart = (bookId: string) => {
    setCart(cart.filter((book) => book.id !== bookId));
  };

  const checkout = () => {
    // Tạo hành động thanh toán qua coin ở đây
    console.log('Thanh toán qua coin');
  };

  return (
    <div>
      <h1>Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn trống.</p>
      ) : (
        <ul>
          {cart.map((book) => (
            <li key={book.id} style={{ marginBottom: '10px' }}>
              <h3>{book.title}</h3>
              <p>Tác giả: {book.author}</p>
              <p>Giá: {book.price} coin</p>
              <button onClick={() => removeFromCart(book.id)}>Xóa khỏi giỏ hàng</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={checkout} disabled={cart.length === 0}>Thanh toán</button>
    </div>
  );
};

export default Cart;
