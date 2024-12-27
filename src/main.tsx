import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './provider/AuthContext.tsx'; 
import { CartProvider } from "./provider/CartContext.tsx";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* Bọc App trong AuthProvider */}
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
