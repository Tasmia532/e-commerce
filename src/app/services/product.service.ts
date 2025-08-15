import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsCollection;

  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'products');
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Product) {
    const productWithTimestamp = { ...product, createdAt: serverTimestamp() };
    return addDoc(this.productsCollection, productWithTimestamp);
  }

  updateProduct(id: string, product: Partial<Product>) {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return updateDoc(productDocRef, product);
  }

  deleteProduct(id: string) {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDocRef);
  }
}
