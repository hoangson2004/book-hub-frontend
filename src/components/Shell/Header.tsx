import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    isAuthenticated: boolean;
    onLogin: () => void;
    onLogout: () => void;
    coinBalance: number;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogin, onLogout, coinBalance }) => {
    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 20px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #ddd',
                width: '97%',
                height: '80px', // Thu nhỏ header
            }}
        >
            <div>
                <h1 style={{ fontSize: '20px', margin: '10px' }}>The Book Hub</h1>
            </div>

            <div>
                {isAuthenticated ? (
                    <>
                        <span style={{ marginRight: '10px' }}>Số dư: {coinBalance} Coin</span>
                        <button onClick={onLogout}>Đăng xuất</button>
                    </>
                ) : (
                    <>
                        <Link to="/sign-in" style={{ marginRight: '10px' }}>
                            <button>Đăng nhập</button>
                        </Link>
                        <Link to="/sign-up" style={{ marginRight: '10px' }}>
                            <button>Đăng ký</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
