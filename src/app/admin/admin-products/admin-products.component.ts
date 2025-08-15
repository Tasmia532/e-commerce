import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  newProduct: Product = { id: '', name: '', categoryId: '', price: 0, description: '', imageUrl: '',quantity: 0, rating: 0};
  editId: string | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data || []);
    this.categoryService.getCategories().subscribe(data => this.categories = data || []);
  }

  addProduct() {
    if (!this.newProduct.name.trim() || !this.newProduct.categoryId) return;

    this.newProduct.id = uuidv4();
    this.productService.addProduct(this.newProduct)
      .then(() => this.resetForm())
      .catch(err => console.error(err));
  }

  startEdit(product: Product) {
    if (!product.id) return; // safety check
    this.editId = product.id;
    this.newProduct = { ...product };
  }

  saveEdit() {
    if (!this.editId) return;
    this.productService.updateProduct(this.editId, this.newProduct)
      .then(() => this.resetForm())
      .catch(err => console.error(err));
  }

  deleteProduct(id?: string) {
    if (!id) return;
    this.productService.deleteProduct(id).catch(err => console.error(err));
  }

  resetForm() {
    this.editId = null;
    this.newProduct = { id: '', name: '', categoryId: '', price: 0, description: '', imageUrl: '' ,quantity: 0, rating: 0 };
  }

  getCategoryName(catId?: string): string {
    const cat = this.categories.find(c => c.id === catId);
    return cat ? cat.name : 'N/A';
  }
}
