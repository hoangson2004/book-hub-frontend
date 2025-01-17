import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/bookService'; 
import { Book } from '../../types/Book';
import Cart from '../../components/Cart/Cart';
import Shell from '../../components/Shell/Shell';
import './BookDetail.css';


const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookId) throw new Error("Không tìm thấy Book ID");
        const bookData = await getBookById(bookId);
        console.log("Fetched Book:", bookData); 
        setBook(bookData);
      } catch (error) {
        setError('Lỗi khi tải chi tiết sách');
        console.error('Lỗi khi tải sách:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBook();
  }, [bookId]);
  

  return (
    <Shell>
      <div className="book-detail-container">
        <div className="book-detail-content">
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p>{error}</p>
          ) : book ? (
            <div className="book-detail">
              <img className='book-detail-img' src={book.imageUrl} alt={book.title} />
              <h2>{book.title}</h2>
              <p><strong>Tác giả:</strong> {book.author}</p>
              <p><strong>Mô tả:</strong> {book.description}</p>
              <p><strong>Giá:</strong> {book.price} coin</p>
              <p><strong>Giá thuê:</strong> {(book.price * 0.02).toFixed(2)} coin/ngày</p>
              <p><strong>Tồn kho:</strong> {book.stock} cuốn</p>
              <p><strong>Ngày tạo:</strong> {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'Không rõ'}</p>
              <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
            </div>
          ) : (
            <p>Không tìm thấy sách</p>
          )}
        </div>
        <div className="cart-container">
          <Cart />
        </div>
      </div>
    </Shell>
  );
};

export default BookDetailPage;
