import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Lưu ý sử dụng Routes thay vì Switch
import Home from './pages/Home/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import BookDetail from './pages/BookDetail/BookDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetail />} /> {/* Định nghĩa route chi tiết sách */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
