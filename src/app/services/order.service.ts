// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  placeOrder(order: Order) {
    return this.firestore.collection('orders').add(order);
  }

  getAllOrders() {
    return this.firestore.collection<Order>('orders').snapshotChanges();
  }

  updateOrderStatus(id: string, status: 'new' | 'processed' | 'completed') {
    return this.firestore.collection('orders').doc(id).update({ status });
  }
}
