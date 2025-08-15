import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categoriesCollection;

  constructor(private firestore: Firestore) {
    this.categoriesCollection = collection(this.firestore, 'categories');
  }

  // Get categories with id
  getCategories(): Observable<Category[]> {
    return collectionData(this.categoriesCollection, { idField: 'id' }) as Observable<Category[]>;
  }

  // Add new category
  addCategory(category: Category): Promise<void> {
    const newCat = {
      ...category,
      slug: category.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: serverTimestamp()
    };
    return addDoc(this.categoriesCollection, newCat).then(() => {});
  }

  // Update category name
  updateCategory(id: string, name: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    const updatedSlug = name.toLowerCase().replace(/\s+/g, '-');
    return updateDoc(categoryDocRef, { name, slug: updatedSlug });
  }

  // Delete category
  deleteCategory(id: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    return deleteDoc(categoryDocRef);
  }
}
