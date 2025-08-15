import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { id: '', name: '', slug: '', createdAt: undefined };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory() {
    this.newCategory.id = uuidv4();
    this.newCategory.slug = this.newCategory.name.toLowerCase().replace(/\s+/g, '-');
    this.categoryService.addCategory(this.newCategory).then(() => {
      // Reset the form
      this.newCategory = { id: '', name: '', slug: '', createdAt: undefined };
    });
  }

  updateCategory(category: Category) {
    if (!category.id) return;
    this.categoryService.updateCategory(category.id, category.name);
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }
}
