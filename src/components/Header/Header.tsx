import React, { useState } from 'react';
import './Header.css'; // Import CSS
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, coinBalance, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic tìm kiếm tại đây, ví dụ gọi API tìm kiếm
    alert(`Tìm kiếm: ${searchQuery}`);
  };

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <img 
          src="/images/home.webp" 
          alt="Logo" 
          className="logo" 
        />
        <h1>The Book Hub</h1>
      </Link>

      <form className="header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Nhập tên sách hoặc tác giả..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Tìm kiếm</button>
      </form>

      <div className="header-auth">
        {isAuthenticated ? (
          <div className='right-button'>
            <span className="coin-balance">Số dư: {coinBalance.toFixed(2)} Coin</span>
            <button onClick={logout} className="auth-button">Đăng xuất</button>
          </div>
        ) : (
          <div className='right-button'>
            <Link to="/sign-in">
              <button className="auth-button">Đăng nhập</button>
            </Link>

            <Link to="/sign-up">
              <button className="auth-button">Đăng ký</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
