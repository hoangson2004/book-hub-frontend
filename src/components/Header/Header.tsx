import React from 'react';
import './Header.css'; // Import CSS
import { Link } from 'react-router-dom';
import { useAuth } from '../../provider/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, coinBalance, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-title">
        <h1>The Book Hub</h1>
      </div>
      <div className="header-auth">
        {isAuthenticated ? (
          <>
            <span className="coin-balance">Số dư: {coinBalance} Coin</span>
            <button onClick={logout} className="auth-button">Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className="auth-button">Đăng nhập</button>
            </Link>

            <Link to="/sign-up">
              <button className="auth-button">Đăng ký</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
