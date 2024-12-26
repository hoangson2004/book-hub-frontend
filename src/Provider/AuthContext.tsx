import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCoinBalance } from '../services/authService';

interface AuthContextProps {
    isAuthenticated: boolean;
    coinBalance: number;
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
                    // Assuming balance is an object with shape { balance: number }
                    setCoinBalance(balance.balance || 0);
                } catch (error) {
                    console.error('Error fetching coin balance:', error);
                    setCoinBalance(0);
                }
            };
            fetchCoinBalance();
        }
    }, []);


    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('coinBalance');
        setCoinBalance(0);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, coinBalance, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
