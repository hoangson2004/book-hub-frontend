import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Dùng useParams để lấy tham số từ URL
//import { getBookById, Book } from '../../services/bookService';
//import './BookDetail.css';

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>(); // Lấy bookId từ URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const bookData = await getBookById(bookId); // Lấy thông tin sách theo bookId
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi tải chi tiết sách');
        setLoading(false);
        console.error('Lỗi khi tải sách chi tiết:', error);
      }
    };

    fetchBookDetail();
  }, [bookId]);

  if (loading) {
    return <p>Đang tải chi tiết sách...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="book-detail-container">
      {book && (
        <>
          <img src={book.imageUrl} alt={book.title} />
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <p>{book.price} coin</p>
          <p>{book.description}</p>
        </>
      )}
    </div>
  );
};

export default BookDetail;
