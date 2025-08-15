import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, serverTimestamp, orderBy, query, deleteDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersCollection;

  constructor(private firestore: Firestore) {
    this.ordersCollection = collection(this.firestore, 'orders');
  }
   deleteOrder(orderId: string) {
    const orderDocRef = doc(this.firestore, `orders/${orderId}`);
    return deleteDoc(orderDocRef);
  }

getOrders(): Observable<Order[]> {
  const ordersCollection = collection(this.firestore, 'orders');
  const q = query(ordersCollection, orderBy('createdAt', 'desc'));
  return collectionData(q, { idField: 'id' }).pipe(
    map((orders: any[]) =>
      orders.map(order => ({
        ...order,
        id: order.id || '',
        userId: order.userId || '',
 userName: order.userName || '',          address: order.address || '',
        items: order.items || [],
        products: order.items || [], // <- fill products for admin template
        totalPrice: order.items
          ? order.items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
          : 0,
        payment: order.payment || 'N/A',
        status: (order.status || 'new').toLowerCase() as 'new' | 'processing' | 'completed',
        createdAt: order.createdAt || new Date(),
        orderNumber: order.orderNumber || 0
      }))
    )
  );
}




addOrder(order: Order) {
  const orderWithTimestamp = {
    ...order,
    userName: order.fullName || '',   // make sure this exists
    userId: order.userId,
    createdAt: new Date(),
  };
  const ordersCollection = collection(this.firestore, 'orders');
  return addDoc(ordersCollection, orderWithTimestamp);
}



  updateStatus(orderId: string, status: 'new' | 'processing' | 'completed') {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    return updateDoc(orderDoc, { status });
  }
}
