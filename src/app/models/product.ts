export interface Product {
  id?: string;  // <-- add this
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
