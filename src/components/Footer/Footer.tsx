import React from 'react';
import './Footer.css'; // Import CSS

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 BookHub. All rights reserved.</p>
      <p>
        <a href="/privacy-policy" className="footer-link">Chính sách bảo mật</a> | 
        <a href="/terms-of-service" className="footer-link">Điều khoản dịch vụ</a>
      </p>
    </footer>
  );
};

export default Footer;
