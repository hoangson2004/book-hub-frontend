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