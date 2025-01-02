import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Lưu ý sử dụng Routes thay vì Switch
import Home from './pages/Home/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import BookDetail from './pages/BookDetail/BookDetail';
import Order from './pages/Order/Order';
import OrderList from './components/OrderList/OrderList';
import OrderDetail from './components/OrderDetail/OrderDetail';
import CreateOrder from './components/CreateOrder/CreateOrder';
import UserProfile from './pages/UserProfile/Userprofile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/account" element={<UserProfile/>} />
        <Route path="/orders" element={<Order />}>
          <Route path="create" element={<CreateOrder />} />
          <Route path="history" element={<OrderList />} />
          <Route path=":orderId" element={<OrderDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
