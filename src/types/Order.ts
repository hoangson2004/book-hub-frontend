export interface OrderItem {
  bookId: string;
  quantity: number;
  price: number;
}

export interface ListOrder {
  orderId: string;
  status: string;
  updatedAt: string;  
}

export interface OrderDetailType extends ListOrder {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  depositAmount: number;
  rentalAmount: number;
  paymentMethod: string;
  dueDate: string;  
  createdAt: string;  
  updatedAt: string;  
}

export interface CreateOrder {
  items: {
    bookId: string;
    quantity: number;
  }[];
  paymentMethod: string;
  dueDate: string;
}