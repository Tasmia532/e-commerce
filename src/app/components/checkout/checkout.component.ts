import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartItems: any[] = [];
  total = 0;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) 
  
  
  {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      paymentMethod: ['Cash on Delivery', Validators.required], // default value set
    });

    this.cartItems = this.cartService.getItems();
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
placeOrder() {
  if (this.checkoutForm.invalid || this.cartItems.length === 0) {
    alert('Fill all fields and add items to cart.');
    return;
  }

  const fullNameFromForm = this.checkoutForm.value.fullName?.trim();

  const order = {
    userId: this.auth.currentUser?.uid,
    userName: fullNameFromForm || this.auth.currentUser?.displayName || this.auth.currentUser?.email || 'N/A',
    items: this.cartItems,
    products: this.cartItems,          // for admin template
    totalPrice: this.total,            // for admin template
    address: this.checkoutForm.value.address,
    payment: this.checkoutForm.value.paymentMethod,
    status: 'new',
    createdAt: serverTimestamp(),
  };

  const ordersRef = collection(this.firestore, 'orders');
  addDoc(ordersRef, order)
    .then(() => {
      alert('✅ Order placed!');
      this.cartService.clearCart();
      this.router.navigate(['/my-orders']);
    })
    .catch((error) => {
      console.error('❌ Error placing order:', error);
    });
}
}
