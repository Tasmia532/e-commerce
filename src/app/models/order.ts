// src/app/models/order.ts
export interface Order {
  id?: string;
  userId: string;
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: 'Cash' | 'Card';
  cartItems: any[]; // or use your CartItem[] interface if defined
  totalAmount: number;
  status: 'new' | 'processed' | 'completed';
  orderDate: Date;
}
