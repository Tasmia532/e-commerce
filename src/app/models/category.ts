export interface Category {
  id?: string;        // Firestore doc id (optional)
  name: string;
  slug: string;
  createdAt?: any;    // Firestore Timestamp or Date (optional)
}
