import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAllBooks, Book } from '../../services/bookService';
import Cart from '../../components/Cart/Cart';
import Shell from '../../components/Shell/Shell';
import BookList from '../../components/BookList/BookList';
import './Home.css';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); 

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

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book._id}`); 
  };

  return (
    <Shell>
      <div className="home-container" >
        <div className="book-list-container">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <BookList books={books} onBookClick={handleBookClick} />
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
