// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sách:', error);
      }
    };

    fetchBooks();
  }, []);

  const addToCart = (book: Book) => {
    console.log(`Thêm sách vào giỏ hàng:`, book);
    // Sau này sẽ kết nối với giỏ hàng
  };

  return (
    <div>
      <h1>Danh sách sách</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <h3>{book.title}</h3>
            <p>Tác giả: {book.author}</p>
            <p>Giá: {book.price} coin</p>
            <p>{book.description}</p>
            <button onClick={() => addToCart(book)}>Thêm vào giỏ hàng</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
