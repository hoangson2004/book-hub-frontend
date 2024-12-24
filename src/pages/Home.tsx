import React, { useEffect, useState } from 'react';
import { getAllBooks, Book } from '../services/bookService';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Book[]>([]); // Giỏ hàng
  const navigate = useNavigate();  // Khởi tạo useNavigate

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

  // Thêm sách vào giỏ hàng
  const addToCart = (book: Book) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`${book.title} đã được thêm vào giỏ hàng!`);
  };

  // Điều hướng đến trang chi tiết sách
  const goToBookDetails = (bookId: string) => {
    navigate(`/book/${bookId}`);  // Điều hướng đến trang chi tiết sách
  };

  return (
    <div>
      <h1>Danh sách sách</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((book) => (
            <li
              key={book._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  style={{ width: '100px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => goToBookDetails(book._id)} // Khi click vào hình sẽ điều hướng đến chi tiết sách
                />
              )}
              <h3>{book.title}</h3>
              <p>Tác giả: {book.author}</p>
              <p>Giá: {book.price.toFixed(2)} coin</p>
              <p>Số lượng: {book.stock}</p>
              <button onClick={() => addToCart(book)}>Thêm vào giỏ hàng</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
