import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private cartCount$ = new BehaviorSubject<number>(0);
  getCart: any;

  constructor() {
    const savedCart = localStorage.getItem('cart');
    this.items = savedCart ? JSON.parse(savedCart) : [];
    this.updateCartCount();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartCount();
  }

  private updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount$.next(count);
  }

  getCartCount() {
    return this.cartCount$.asObservable();
  }

  getItems() {
    return this.items;
  }

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  }

  decreaseQuantity(productId: string) {
    const item = this.items.find(i => i.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeFromCart(productId);
    }
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
