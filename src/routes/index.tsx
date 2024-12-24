// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
//import OrderHistory from '../pages/OrderHistory';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
