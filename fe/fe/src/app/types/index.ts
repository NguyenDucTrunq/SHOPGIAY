// User related types
export interface User {
  userId?: number;
  email: string;
  password: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
}

// Product related types
export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  color: string[];
  stock: number;
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