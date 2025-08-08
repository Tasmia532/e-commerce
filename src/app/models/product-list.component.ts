import { Component } from '@angular/core';
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
export class ProductListComponent {
  products: Product[] = [];
  originalProducts: Product[] = [];
  priceSort: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
  this.products = data as Product[];
});
 // Preserve original list
  
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  sortByPrice() {
    if (this.priceSort === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.priceSort === 'desc') {
      this.products.sort((a, b) => b.price - a.price);
    } else {
      this.products = [...this.originalProducts]; // Reset
    }
  }
}
