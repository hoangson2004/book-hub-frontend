import api from './api'; // Import api đã cấu hình

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
      id: string;
      username: string;
      role: string;
    };
  }

export const register = async (data: RegisterData): Promise<void> => {
    try {
        await api.post('/auth/register', data); // Gửi yêu cầu đến endpoint đăng ký
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error;
    }
};

export interface LoginData {
    email: string;
    password: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data; 
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      throw error;
    }
  };
