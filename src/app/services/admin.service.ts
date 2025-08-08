import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  getOrders(): Observable<any[]> {
    const ordersRef = collection(this.firestore, 'orders');
    return collectionData(ordersRef, { idField: 'id' });
  }

  updateOrderStatus(orderId: string, status: string): Promise<void> {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    return updateDoc(orderDoc, { status });
  }

  async isCurrentUserAdmin(): Promise<boolean> {
    const user = this.auth.currentUser;
    if (!user) return false;

    const userDoc = doc(this.firestore, `users/${user.uid}`);
    const userSnap = await getDoc(userDoc);
    return userSnap.exists() && userSnap.data()?.['isAdmin'] === true;
  }
}
