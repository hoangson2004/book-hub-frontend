import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCoinBalance, login as loginService } from '../services/authService';

interface AuthContextProps {
    isAuthenticated: boolean;
    coinBalance: number;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [coinBalance, setCoinBalance] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const fetchCoinBalance = async () => {
                try {
                    const balance = await getCoinBalance();
                    setCoinBalance(balance.balance || 0);
                } catch (error) {
                    console.error('Error fetching coin balance:', error);
                    setCoinBalance(0);
                }
            };
            fetchCoinBalance();
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { token, user } = await loginService({ email, password });

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setIsAuthenticated(true);
            alert(`Chào mừng ${user.username}`);
        } catch (error) {
            throw new Error('Đăng nhập thất bại');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('coinBalance');
        setCoinBalance(0);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, coinBalance, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
