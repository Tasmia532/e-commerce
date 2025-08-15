export interface Product {
rating: number;
  quantity: number;
  id?: string;          // Firestore doc ID
  name: string;
  categoryId: string;   // link to Category
  price: number;
  description?: string;
  imageUrl?: string;
  createdAt?: any;
}
