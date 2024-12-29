import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Import CSS

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Tiểu thuyết</Link></li>
        <li className="nav-item"><Link to="/">Truyện tranh</Link></li>
        <li className="nav-item"><Link to="/">Trinh thám</Link></li>
        <li className="nav-item"><Link to="/">Kiếm hiệp</Link></li>
        <li className="nav-item"><Link to="/">Ngôn tình</Link></li>
        <li className="nav-item"><Link to="/">Thiếu nhi</Link></li>
        <li className="nav-item"><Link to="/">Sách kỹ năng</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
