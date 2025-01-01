import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, coinBalance, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tìm kiếm: ${searchQuery}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <img 
          src="/images/logo.png" 
          alt="Logo" 
          className="logo" 
        />
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
          <div className="right-button">
            <div className="user-avatar-container">
              <button className="avatar-button" onClick={toggleMenu}>
                <img 
                  src="/images/avatar.png" 
                  alt="User Avatar"
                  className="avatar-image"
                />
              </button>
              {isMenuOpen && (
                <div className="avatar-menu">
                  <Link to="/account" className="menu-item">Quản lý tài khoản</Link>
                  <Link to="/orders/create" className="menu-item">Quản lý đơn hàng</Link>
                  <Link to="/transactions" className="menu-item">Quản lý giao dịch</Link>
                  <Link to="/favorites" className="menu-item">Danh sách yêu thích</Link>
                  <Link to="/inbox" className="menu-item">Thư báo</Link>
                  <Link to="/settings" className="menu-item">Cài đặt</Link>
                </div>
              )}
            </div>

            <span className="coin-balance">Số dư: {coinBalance.toFixed(2)} Coin</span>
            <button onClick={logout} className="auth-button">Đăng xuất</button>
          </div>
        ) : (
          <div className="right-button">
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
