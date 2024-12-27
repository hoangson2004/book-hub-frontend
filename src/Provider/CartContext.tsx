import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartByUserId, removeFromCart, updateCart, addToCart as addToCartService } from '../services/cartService';

interface CartItem {
    bookId: string;
    title: string;
    price: number;
    quantity: number;
}

interface CartContextValue {
    cart: CartItem[];
    loading: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    handleRemove: (bookId: string) => Promise<void>;
    handleUpdate: (bookId: string, quantity: number) => Promise<void>;
    addToCart: (bookId: string, quantity: number) => Promise<void>; // Thêm hàm addToCart
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy giỏ hàng
    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Vui lòng đăng nhập để xem giỏ hàng.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await getCartByUserId();
            if (response.status === 'success' && Array.isArray(response.data)) {
                setCart(response.data);
            } else {
                setCart([]);
                setError('Giỏ hàng rỗng hoặc dữ liệu không hợp lệ.');
            }
        } catch (err) {
            setError('Lỗi khi tải giỏ hàng.');
        } finally {
            setLoading(false);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemove = async (bookId: string) => {
        try {
            await removeFromCart(bookId);
            fetchCart(); // Cập nhật giỏ hàng sau khi xóa
        } catch (err) {
            console.error('Lỗi khi xóa sách:', err);
        }
    };

    // Cập nhật số lượng sản phẩm
    const handleUpdate = async (bookId: string, quantity: number) => {
        try {
            await updateCart(bookId, quantity);
            fetchCart(); // Cập nhật giỏ hàng sau khi cập nhật
        } catch (err) {
            console.error('Lỗi khi cập nhật số lượng:', err);
        }
    };

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (bookId: string, quantity: number) => {
        try {
            await addToCartService(bookId, quantity);
            fetchCart(); // Cập nhật giỏ hàng sau khi thêm
        } catch (err) {
            console.error('Lỗi khi thêm sách vào giỏ hàng:', err);
            throw new Error('Không thể thêm sách vào giỏ hàng.');
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                fetchCart,
                handleRemove,
                handleUpdate,
                addToCart, // Thêm vào context provider
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextValue => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
