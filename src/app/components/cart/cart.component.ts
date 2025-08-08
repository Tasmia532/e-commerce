import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: any[] = [];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  getTotal() {
    return this.cartService.getTotalPrice();
  }

  increaseQuantity(item: any) {
    this.cartService.addToCart(item);
    this.items = this.cartService.getItems();
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item.id);
    this.items = this.cartService.getItems();
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item.id);
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }
}
