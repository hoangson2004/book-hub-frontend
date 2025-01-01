import api from './api';

export const getCartByUserId = async () => {
    try {
        const response = await api.get('/cart');  
        return response.data;  
    } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        throw error;
    }
};

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

export const removeFromCart = async (bookId: string) => {
    try {
        const response = await api.delete(
            '/cart/remove',
            { data: { bookId } }  
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa sách khỏi giỏ hàng:', error);
        throw error;
    }
};
