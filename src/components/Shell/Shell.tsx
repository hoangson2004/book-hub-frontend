import React, { useState, useEffect } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

interface ShellProps {
    children: React.ReactNode; // Chấp nhận nội dung trang
}

const Shell: React.FC<ShellProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Kiểm tra nếu người dùng đã đăng nhập
    const [coinBalance, setCoinBalance] = useState<number>(0); // Số dư coin

    useEffect(() => {
        // Kiểm tra token trong localStorage khi load lại trang
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Lấy số dư coin từ localStorage (hoặc API nếu có)
            const savedCoinBalance = localStorage.getItem('coinBalance');
            setCoinBalance(savedCoinBalance ? parseInt(savedCoinBalance) : 0);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('token', 'fake_token'); // Lưu token giả vào localStorage
        setCoinBalance(100); // Cập nhật số dư coin
        localStorage.setItem('coinBalance', '100'); // Lưu số dư coin vào localStorage
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('coinBalance');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header
                isAuthenticated={isAuthenticated}
                onLogin={handleLogin}
                onLogout={handleLogout}
                coinBalance={coinBalance}
            />
            <Nav />
            <div style={{ display: 'flex', flex: 1 }}>
                <main style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
                    {children}
                </main>

            </div>

            <Footer />
        </div>
    );
};

export default Shell;
