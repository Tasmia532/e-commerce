import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
[x: string]: any;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  originalProducts: Product[] = [];
  selectedCategory: string = '';
  priceSort: string = '';
  addingToCart: { [key: string]: boolean } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.originalProducts = [...data];
      this.filteredProducts = [...data];
    });
  }

  addToCart(product: Product) {
    this.addingToCart[product.id || ''] = true;

    setTimeout(() => {
      this.cartService.addToCart(product);
      this.addingToCart[product.id || ''] = false;
    }, 500); // 0.5s spinner feedback
  }

  applyFilters() {
    this.filteredProducts = [...this.originalProducts];

    if (this.selectedCategory) {
      this.filteredProducts = this.filteredProducts.filter(
        p => p.categoryId === this.selectedCategory
      );
    }

    if (this.priceSort === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.priceSort === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
}
