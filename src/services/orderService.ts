import api from './api'; // Giả sử api là axios instance của bạn
import { OrderItem, OrderDetailType, CreateOrder } from '../types/Order';

// Lấy danh sách đơn hàng
export const getListOrder = async (): Promise<OrderItem[]> => {
    try {
        const response = await api.get('/order/list');
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('Dữ liệu không hợp lệ khi lấy danh sách đơn hàng');
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        throw error;
    }
};

export const getOrderDetail = async (orderId: string): Promise<OrderDetailType> => {
    try {
        const response = await api.get(`/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết đơn hàng với orderId ${orderId}:`, error);
        throw error;
    }
};

export const createOrderApi = async (orderData: CreateOrder) => {
    try {
        const response = await api.post('/order/create', orderData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        throw error;
    }
};