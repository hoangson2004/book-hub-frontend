import React, { useEffect, useState } from 'react';
import { getAllBooks, Book } from '../services/bookService';
import Cart from '../components/Cart/Cart'; // Import Cart component
import Shell from '../components/Shell/Shell';
import BookList from '../components/BookList/BookList'; // Import BookList component
import './Home.css'; // Import file CSS để tạo layout

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(booksData);
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi tải danh sách sách');
        setLoading(false);
        console.error('Lỗi khi tải sách:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Shell>
      <div className="home-container">
        <div className="book-list-container">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <BookList books={books} />
          )}
        </div>
        <div className="cart-container">
          <Cart />
        </div>
      </div>
    </Shell>
  );
};

export default Home;
