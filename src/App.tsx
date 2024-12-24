import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Lưu ý sử dụng Routes thay vì Switch
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} /> {/* Định nghĩa route chi tiết sách */}
      </Routes>
    </Router>
  );
};

export default App;
