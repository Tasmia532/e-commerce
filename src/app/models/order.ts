export interface OrderItem {
imageUrl: any;
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface Order {
  id: string;
  userId: string;
  email?: string;      // <-- add this
  fullName?: string;
  address?: string;
    phone?: string;

  items: OrderItem[];
  products: OrderItem[];   // Admin template uses this
  totalPrice: number;      // Admin template uses this
  payment: string;
  status: 'new' | 'processing' | 'completed';
  createdAt?: any;
  orderNumber?: number;
}
