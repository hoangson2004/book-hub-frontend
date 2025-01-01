import React from 'react';
import { useCart } from '../../provider/CartContext';
import { useNavigate } from 'react-router-dom'; 
import './Cart.css';

const Cart: React.FC = () => {
    const { cart, loading, error, handleRemove, handleUpdate } = useCart();
    const navigate = useNavigate();

    if (loading) return <p className="cart-loading">Đang tải giỏ hàng...</p>;
    if (error) return <p className="cart-error">{error}</p>;

    return (
        <div className="cart-container">
            <h2 className="cart-title">Giỏ hàng của bạn</h2>
            {cart.length === 0 ? (
                <p className="cart-empty">Giỏ hàng rỗng.</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.bookId} className="cart-item">
                            <p className="cart-item-title">Tên sách: {item.title}</p>

                            <div className="cart-item-bottom">
                                <div className="cart-item-left">
                                    <p className="cart-item-price">Giá: {item.price} coin</p>
                                    <p className="cart-item-quantity">Số lượng: {item.quantity}</p>
                                </div>

                                <div className="cart-item-right">
                                    <button
                                        onClick={() => handleUpdate(item.bookId, item.quantity + 1)}
                                        className="cart-item-button"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(item.bookId, item.quantity - 1)}
                                        disabled={item.quantity === 0}
                                        className="cart-item-button"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item.bookId)}
                                        className="cart-item-remove-button"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <button
                    className="checkout-button"
                    onClick={() => (window.location.href = '/orders')}
                >
                    Đặt hàng
                </button>
            )}
        </div>
    );
};

export default Cart;
