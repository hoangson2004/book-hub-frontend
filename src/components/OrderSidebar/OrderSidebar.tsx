import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar-content">
      <ul>
        <li>
          <Link to="/orders/create" className={location.pathname === '/orders/create' ? 'active' : ''}>
            Tạo đơn hàng
          </Link>
        </li>
        <li>
          <Link to="/orders/history" className={location.pathname === '/orders/history' ? 'active' : ''}>
            Lịch sử đơn hàng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
