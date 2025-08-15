// src/app/admin/admin-navbar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service'; // ✅ Import AuthService

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white shadow-lg flex justify-between items-center">
    <!-- Left side -->
    <div class="flex space-x-6 items-center text-lg font-medium">
      <a routerLink="/admin/dashboard/categories" routerLinkActive="border-b-2 border-yellow-400" class="flex items-center space-x-1 hover:text-yellow-200 transition">
        📂 <span>Categories</span>
      </a>
      <a routerLink="/admin/dashboard/products" routerLinkActive="border-b-2 border-yellow-400" class="flex items-center space-x-1 hover:text-yellow-200 transition">
        🛒 <span>Products</span>
      </a>
      <a routerLink="/admin/dashboard/orders" routerLinkActive="border-b-2 border-yellow-400" class="flex items-center space-x-1 hover:text-yellow-200 transition">
        📦 <span>Orders</span>
      </a>
    </div>

    <!-- Right side -->
    <div>
      <button (click)="logout()" class="btn btn-primary btn-sm">
  Logout
</button>

    </div>
  </nav>
  `
})
export class AdminNavbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout(); // ✅ Calls AuthService logout
  }
}
