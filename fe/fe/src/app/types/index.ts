// User related types
export interface User {
  userId: number; // Không còn tùy chọn
  email: string;
  password: string;
  role: string; // Không còn tùy chọn, mặc định là 'User' hoặc 'Admin'
}

// Product related types
export interface Product {
  productID: number;
  productName: string;
  description?: string;
  price: number;
  quantity: number;
  brand?: string;
  category?: string;
  size?: string;
  imageURL?: string;
  createdAt: string;
}

// Order related types
export interface Order {
  orderId: number;
  userId: number;
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

// Cart related types
export interface Cart {
  cartId: number;
  userId: number;
  items: CartItem[];
}

export interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
}

// Category related types
export interface Category {
  categoryId: number;
  name: string;
  description: string;
}

// Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}