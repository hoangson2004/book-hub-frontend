import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext.tsx';
import Shell from '../../components/Shell/Shell.tsx';
import './auth.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/'); 
      window.location.reload();
    } catch (error) {
      setError('Email hoặc mật khẩu không đúng');
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  return (
    <Shell>
      <div className="auth-form">
        <h1>Đăng nhập</h1>
        {error && <p className="error-message">{error}</p>}
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

        <div className="switch-container">
          <p>Chưa có tài khoản? <a href="/sign-up">Đăng ký</a></p>
        </div>
      </div>
    </Shell>
  );
};

export default SignIn;
