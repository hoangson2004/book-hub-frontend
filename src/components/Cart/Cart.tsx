import React, { useEffect, useState } from 'react';
import { getCartByUserId, removeFromCart, updateCart } from '../../services/cartService';

interface CartItem {
    bookId: string;
    title: string;
    price: number;
    quantity: number;
}

const Cart: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    console.log('Token trong localStorage:', token);

    // Hàm lấy giỏ hàng
    const fetchCart = async () => {
        if (!token) {
            setError('Token không tồn tại hoặc không hợp lệ');
            setLoading(false);
            return;
        }

        try {
            console.log('Đang gọi API để lấy giỏ hàng...');
            const response = await getCartByUserId();
            console.log('Dữ liệu giỏ hàng từ API:', response);

            // Xử lý dữ liệu trả về
            if (response.status === 'success' && Array.isArray(response.data)) {
                setCart(response.data);
            } else {
                setCart([]);
                setError('Giỏ hàng rỗng hoặc dữ liệu không hợp lệ.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi gọi API giỏ hàng:', error);
            setError('Lỗi khi tải giỏ hàng');
            setLoading(false);
        }
    };

    // Gọi hàm fetchCart mỗi khi có thay đổi giỏ hàng
    useEffect(() => {
        fetchCart();
    }, [token]);

    const handleRemove = async (bookId: string) => {
        try {
            console.log('Đang xóa sách:', bookId);
            await removeFromCart(bookId);
            // Sau khi xóa, gọi lại hàm fetchCart để cập nhật giỏ hàng
            fetchCart();
        } catch (error) {
            console.error('Lỗi khi xóa sách:', error);
        }
    };

    const handleUpdate = async (bookId: string, quantity: number) => {
        try {
            console.log('Đang cập nhật số lượng sách:', bookId, 'Số lượng mới:', quantity);
            await updateCart(bookId, quantity);
            fetchCart();
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

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
