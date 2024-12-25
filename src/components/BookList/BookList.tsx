import React, { useState } from 'react';
import { Book } from '../../services/bookService';
import { addToCart } from '../../services/cartService';
import './BookList.css'; // Import file CSS riêng cho BookList

interface BookListProps {
  books: Book[]; // Tất cả các sách
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const booksPerPage = 10; // Số sách mỗi trang

  // Tính số sách hiển thị trên trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleAddToCart = async (book: Book) => {
    try {
      await addToCart(book._id, 1); // Thêm 1 sách vào giỏ hàng
      alert(`${book.title} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      console.error('Lỗi khi thêm sách vào giỏ hàng:', error);
    }
  };

  // Chuyển sang trang trước
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Chuyển sang trang sau
  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="booklist-container">
      <h2 className="booklist-title">Danh sách truyện</h2>
      <div className="book-list">
        {currentBooks.map((book) => (
          <div key={book._id} className="book-item">
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.price} coin</p>
            <button onClick={() => handleAddToCart(book)}>Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>
          {currentPage} / {Math.ceil(books.length / booksPerPage)}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(books.length / booksPerPage)}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default BookList;
