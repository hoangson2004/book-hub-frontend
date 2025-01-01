import api from './api';

import { Book } from '../types/Book';

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/book');
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map((book: Book) => ({
        _id: book._id,
        title: book.title,
        author: book.author,
        price: book.price,
        stock: book.stock,
        imageUrl: book.imageUrl,
        createdAt: book.createdAt
      }));
    } else {
      throw new Error('Dữ liệu không hợp lệ, trường "data" không phải là mảng');
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sách:', error);
    throw error;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await api.get(`/book/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sách:', error);
    throw error;
  }
};