import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}

  getCategories() {
    return this.firestore
      .collection<Category>('categories')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Category;
            const id = a.payload.doc.id;
          return { ...data, id }; // ✅ Safe: 'id' from Firestore overrides any inside data
          })
        )
      );
  }

  addCategory(category: Category) {
    return this.firestore.collection('categories').doc(category.id).set(category);
  }

  updateCategory(category: Category) {
    return this.firestore.collection('categories').doc(category.id).update(category);
  }

  deleteCategory(id: string) {
    return this.firestore.collection('categories').doc(id).delete();
  }
}
