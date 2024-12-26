import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Import CSS

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/fiction">Tiểu thuyết</Link></li>
        <li className="nav-item"><Link to="/comics">Truyện tranh</Link></li>
        <li className="nav-item"><Link to="/children">Sách truyện thiếu nhi</Link></li>
        
        {/* Các mục khác */}
      </ul>
    </nav>
  );
};

export default Nav;
