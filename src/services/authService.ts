import api from './api'; // Import api đã cấu hình
import { RegisterData, LoginData, LoginResponse, UpdateProfile, User } from '../types/User';



export const register = async (data: RegisterData): Promise<void> => {
  try {
    await api.post('/auth/register', data); 
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    throw error;
  }
};


export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    throw error;
  }
};

export const getCoinBalance = async () => {
  try {
    const response = await api.get('/coin/balance');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi get coin', error);
    throw error;
  }
}


export const getUserProfile = async (): Promise<User> => {
    try {
        const response = await api.get('/auth/profile');
        return response.data.user; 
    } catch (error) {
        console.error('Lỗi khi lấy hồ sơ người dùng:', error);
        throw error; 
    }
};

export const updateUserProfile = async (profileData: UpdateProfile): Promise<User> => {
    try {
        const response = await api.put('/auth/profile', profileData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật hồ sơ người dùng:', error);
        throw error; 
    }
};
