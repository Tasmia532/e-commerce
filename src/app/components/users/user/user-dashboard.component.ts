import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from 'app/services/category.service';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})export class UserDashboardComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory = '';
  sortPrice = '';
  cartCount = 0; // 🛒 Cart Count

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    // Products
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    // Categories
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
    });

    // Cart Count initially
    this.updateCartCount();
  }

  applyFilters() {
    this.filteredProducts = [...this.products];

    if (this.selectedCategory) {
      this.filteredProducts = this.filteredProducts.filter(
        p => p.categoryId === this.selectedCategory
      );
    }

    if (this.sortPrice === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortPrice === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.updateCartCount(); // 🛒 Update after adding

    const toastEl = document.getElementById('cartToast');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }

  updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
