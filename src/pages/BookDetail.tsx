// BookDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL
import { getBook, Book } from '../services/bookService';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Lấy ID từ URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API để lấy chi tiết sách
  useEffect(() => {
    if (!id) {
      setError('ID không hợp lệ');
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const bookData = await getBook(id);
        setBook(bookData);
        console.log(bookData);
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi tải thông tin sách');
        setLoading(false);
        console.error('Lỗi khi tải thông tin sách:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Đang tải thông tin sách...</p>;
  }

  if (error || !book) {
    return <p>{error || 'Không tìm thấy sách'}</p>;
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
      <p><strong>Tác giả:</strong> {book.author}</p>
      <p><strong>Mô tả:</strong> {book.description}</p>
      <p><strong>Giá:</strong> {book.price ? book.price.toFixed(2) : 'Chưa có giá'}</p>
      <p><strong>Số lượng:</strong> {book.stock}</p>
    </div>
  );
};

export default BookDetail;
