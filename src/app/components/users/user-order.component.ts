import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-order.component.html',
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
  this.orderService.getOrders().subscribe(data => {
    this.orders = data.map(order => ({
      ...order,
      friendlyId: this.generateFriendlyId(order.id || '')
    }));
  });
}

  generateFriendlyId(id: string) {
    // Shorten and make user-friendly
    return id.slice(0, 8).toUpperCase();
  }
}
