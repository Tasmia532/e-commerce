import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  orders: any[] = [];

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    quantity: 0
  };

  constructor(private productService: ProductService, private firestore: Firestore) {}

  ngOnInit() {
    // Load products
    this.productService.getProducts().subscribe(data => {
      this.products = data as Product[];
    });

    // Load orders
    const ordersRef = collection(this.firestore, 'orders');
    collectionData(ordersRef, { idField: 'id' }).subscribe((data: any[]) => {
      this.orders = data;
    });
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.quantity) {
      alert('Fill product name, price, and quantity.');
      return;
    }

    this.productService.addProduct(this.newProduct).then(() => {
      console.log('✅ Product Added');
      this.newProduct = {
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        quantity: 0
      };
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).then(() => console.log('🗑️ Product Deleted'));
  }

  deleteOrder(orderId: string) {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    deleteDoc(orderDoc)
      .then(() => {
        console.log('🗑️ Order Deleted');
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    // abhi ye empty h, aglay step me batadon ga agar chaho
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'new':
        return 'badge-new';
      case 'processing':
        return 'badge-processing';
      case 'completed':
        return 'badge-completed';
      default:
        return '';
    }
  }
}
