import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/OrderSidebar/OrderSidebar';
import Shell from '../../components/Shell/Shell';
import './Order.css'; 
const OrderPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('create', { replace: true });
  }, []);

  return (
    <Shell>
      <div className="order-page">
        <div className="main-content">
          <Outlet /> 
        </div>
        <div className="sidebar">
          <Sidebar /> 
        </div>
      </div>
    </Shell>
  );
};

export default OrderPage;
