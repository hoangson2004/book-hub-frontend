import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './Provider/AuthContext'; // Import AuthProvider

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* Bọc App trong AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
