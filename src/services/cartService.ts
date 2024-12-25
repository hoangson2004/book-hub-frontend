// src/services/cartService.ts
import api from './api';

export const getCartByUserId = async () => {
    try {
        const response = await api.get('/cart');  // Không cần phải thêm header vì đã cấu hình trong interceptor
        return response.data;  // Trả về dữ liệu giỏ hàng
    } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        throw error;
    }
};

// Thêm sách vào giỏ hàng
export const addToCart = async (bookId: string, quantity: number) => {
    try {
        const response = await api.post(
            '/cart/add',
            { bookId, quantity }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm sách vào giỏ hàng:', error);
        throw error;
    }
};

export const updateCart = async (bookId: string, quantity: number) => {
    try {
        const response = await api.put(
            '/cart/update',
            { bookId, quantity }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        throw error;
    }
};

// Xóa sách khỏi giỏ hàng
export const removeFromCart = async (bookId: string) => {
    try {
        const response = await api.delete(
            '/cart/remove',
            { data: { bookId } }  // Gửi bookId trong body
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa sách khỏi giỏ hàng:', error);
        throw error;
    }
};
