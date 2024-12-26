import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { token, user } = await login({ email, password });

      // Lưu token vào localStorage
      localStorage.setItem('token', token);
      // Lưu thông tin user nếu cần
      localStorage.setItem('user', JSON.stringify(user));

      alert(`Chào mừng ${user.username}`);
      navigate('/'); // Điều hướng về trang chính
      window.location.reload();
    } catch (error) {
      setError('Email hoặc mật khẩu không đúng');
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mật khẩu:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default SignIn;
