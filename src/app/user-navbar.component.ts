import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 shadow-lg">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-extrabold">🛍 Shop-Cart</h1>
      <div class="flex gap-8 text-lg font-medium items-center">
        <a routerLink="/products" class="flex items-center gap-1 hover:text-yellow-300 transition">
          🛒 <span>Products</span>
        </a>
        <a routerLink="/cart" class="flex items-center gap-1 hover:text-yellow-300 transition">
          🧺 <span>Cart</span>
        </a>
        <a routerLink="/checkout" class="flex items-center gap-1 hover:text-yellow-300 transition">
          💳 <span>Checkout</span>
        </a>
        <a routerLink="/my-orders" class="flex items-center gap-1 hover:text-yellow-300 transition">
          📦 <span>Orders</span>
        </a>
        <a routerLink="/admin-login" class="flex items-center gap-1 hover:text-yellow-300 transition">
          🔐 <span>Admin</span>
        </a>
      </div>
    </div>
  </nav>
  `
})
export class UserNavbarComponent {}
