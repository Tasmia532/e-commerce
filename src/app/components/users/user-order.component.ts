import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { collection as col, QueryConstraint } from 'firebase/firestore';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './user-order.component.html'
})
export class MyOrdersComponent {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  orders$: Observable<any[]> = of([]);

  ngOnInit() {
    this.orders$ = new Observable(observer => {
      const unsubscribe = this.auth.onAuthStateChanged(async user => {
        if (!user) {
          observer.next([]);
          return;
        }

        const q = query(
          collection(this.firestore, 'orders'),
          where('userId', '==', user.uid)
        );

        collectionData(q, { idField: 'id' }).subscribe(data => {
          observer.next(data);
        });
      });

      return { unsubscribe };
    });
  }
}
