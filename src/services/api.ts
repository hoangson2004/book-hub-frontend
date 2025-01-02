import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert('Lỗi mạng, vui lòng kiểm tra kết nối.');
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
      localStorage.removeItem('token'); 
      window.location.href = '/sign-in'; 
    } else if (error.response.status === 403) {
      alert('Bạn không có quyền truy cập vào tài nguyên này.');
    } else if (error.response.status === 404) {
      alert('Tài nguyên bạn yêu cầu không tồn tại.');
    } else {
      alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
    }

    return Promise.reject(error);
  }
);

export default api;
