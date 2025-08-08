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
  newCategory: Category = { id: '', name: '', itemNumber: 0 };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory() {
    this.newCategory.id = uuidv4();
    this.categoryService.addCategory(this.newCategory).then(() => {
      this.newCategory = { id: '', name: '', itemNumber: 0 };
    });
  }

  updateCategory(category: Category) {
    this.categoryService.updateCategory(category);
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }
}
