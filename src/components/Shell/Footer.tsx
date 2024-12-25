import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '20px', borderTop: '1px solid #ccc', textAlign: 'center' }}>
      <p>&copy; 2024 BookHub. All rights reserved.</p>
      <p>
        <a href="/privacy-policy">Chính sách bảo mật</a> | <a href="/terms-of-service">Điều khoản dịch vụ</a>
      </p>
    </footer>
  );
};

export default Footer;
