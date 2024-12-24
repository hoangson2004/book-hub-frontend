import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Đảm bảo bạn đã cài react-router-dom
import { getBook, Book } from '../../services/bookService';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        if (id) {
          const bookData = await getBook(id);
          setBook(bookData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sách:', error);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!book) {
    return <p>Không tìm thấy sách.</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          style={{ width: '200px', height: '300px', objectFit: 'cover' }}
        />
      )}
      <p>Tác giả: {book.author}</p>
      <p>Mô tả: {book.description}</p>
      <p>Giá: {book.price.toFixed(2)} coin</p>
      <p>Số lượng: {book.stock}</p>
      <p>Ngày tạo: {new Date(book.createdAt || '').toLocaleDateString()}</p>
    </div>
  );
};

export default BookDetail;
