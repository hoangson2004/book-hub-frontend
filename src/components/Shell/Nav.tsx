import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav style={{ padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/fiction">Tiểu thuyết</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/comics">Truyện tranh</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/children">Sách truyện thiếu nhi</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/fiction">Tiểu thuyết</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/comics">Truyện tranh</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/children">Sách truyện thiếu nhi</Link>
        </li>
        {/* Thêm các danh mục khác nếu cần */}
      </ul>
    </nav>
  );
};

export default Nav;
