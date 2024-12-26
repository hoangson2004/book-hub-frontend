import api from './api';

export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  imageUrl?: string;
  description?: string;
  createdAt?: Date;
}

// Lấy danh sách sách với các trường cần thiết
export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/book');
    // Kiểm tra xem response.data có phải là một đối tượng chứa trường 'data' không
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data.map((book: Book) => ({
        _id: book._id,
        title: book.title,
        author: book.author,
        price: book.price,
        stock: book.stock,
        imageUrl: book.imageUrl,
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