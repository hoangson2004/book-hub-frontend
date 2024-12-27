import React from 'react';
import { useCart } from '../../Provider/CartContext';

const Cart: React.FC = () => {
    const { cart, loading, error, handleRemove, handleUpdate } = useCart();

    if (loading) return <p>Đang tải giỏ hàng...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Giỏ hàng của bạn</h2>
            {cart.length === 0 ? (
                <p>Giỏ hàng rỗng.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.bookId} style={{ marginBottom: '10px' }}>
                            <p><strong>{item.title}</strong></p>
                            <p>Giá: {item.price} coin</p>
                            <p>Số lượng: {item.quantity}</p>
                            <div>
                                <button onClick={() => handleUpdate(item.bookId, item.quantity - 1)} disabled={item.quantity === 0}>-</button>
                                <button onClick={() => handleUpdate(item.bookId, item.quantity + 1)}>+</button>
                                <button onClick={() => handleRemove(item.bookId)}>Xóa khỏi giỏ hàng</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
