import React, { useState } from 'react';
import { Book } from '../../types/Book';
import { useCart } from '../../provider/CartContext';
import './BookList.css';

interface BookListProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onBookClick }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 12;

  const { addToCart } = useCart();

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="booklist-container" >
      <h2 className="booklist-title">Danh sách truyện</h2>
      <div className="book-list">
        {currentBooks.map((book) => (
          <div
          key={book._id}
          className="book-item"
          onClick={() => onBookClick(book)}
        >
          <img src={book.imageUrl} alt={book.title} />
          <h3>{book.title}</h3>
          <h5>{book.author}</h5>
          <div className="price-info">
            <p><strong>Giá bán: </strong>{book.price} coin</p>
            <p><strong>Giá thuê: </strong>{(book.price * 0.02).toFixed(2)} coin/ngày</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(book._id, 1).catch((err) =>
                console.error(err.message)
              );
            }}
          >
            Thêm vào giỏ hàng
          </button>
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
