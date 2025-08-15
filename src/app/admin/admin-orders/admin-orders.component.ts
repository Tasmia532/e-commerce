import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[] = [];
  showDetails: { [key: string]: boolean } = {};

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      (err) => console.error('Error fetching orders:', err)
    );
  }

  toggleDetails(orderId: string) {
    this.showDetails[orderId] = !this.showDetails[orderId];
  }

  updateStatus(order: Order, status: 'new' | 'processing' | 'completed') {
    if (!order.id) return;
    this.orderService.updateStatus(order.id, status)
      .then(() => this.loadOrders()) // refresh after status update
      .catch(err => console.error(err));
  }

  // --- Delete feature ---
  confirmDelete(orderId: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.deleteOrder(orderId);
    }
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId)
      .then(() => {
        // Remove from local array to update UI immediately
        this.orders = this.orders.filter(order => order.id !== orderId);
        console.log('Order deleted successfully');
      })
      .catch(err => console.error('Error deleting order:', err));
  }
}
