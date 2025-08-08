import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');
    this.items = savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
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
