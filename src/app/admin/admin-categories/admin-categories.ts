import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.html'
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  newCategory = '';
  editId: string | null = null;
  editName = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory() {
    if (!this.newCategory.trim()) return;
    this.categoryService.addCategory({
      name: this.newCategory,
      slug: ''
    })
      .then(() => this.newCategory = '');
  }

  startEdit(cat: Category) {
    this.editId = cat.id || null;
    this.editName = cat.name;
  }

  saveEdit() {
    if (!this.editId || !this.editName.trim()) return;
    this.categoryService.updateCategory(this.editId, this.editName)
      .then(() => {
        this.editId = null;
        this.editName = '';
      });
  }

  deleteCategory(id?: string) {
    if (!id) return;
    this.categoryService.deleteCategory(id);
  }
}
