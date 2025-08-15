import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../models/order';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
paymentMethod: any;
buyNow(arg0: OrderItem) {
throw new Error('Method not implemented.');
}
  cartItems: OrderItem[] = [];
  selectedItem: OrderItem | null = null;
  allProducts: any[] = [];
  showCheckoutForm: boolean = false;
  checkoutData: any = {};
  orderPlacedMessage: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private auth: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadCart();
    this.loadAllProducts();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.selectedItem = this.cartItems.length ? this.cartItems[0] : null;
  }

  loadAllProducts() {
    this.productService.getProducts().subscribe(data => this.allProducts = data);
  }

  addToCart(item: OrderItem) {
    this.cartService.addToCart(item);
    this.loadCart();
  }

  selectItem(item: OrderItem) {
    this.selectedItem = item;
  }

  removeItem(item: OrderItem) {
    if (!item) return;
    this.cartService.removeFromCart(item.id!);
    this.loadCart();
    if (this.selectedItem === item) this.selectedItem = null;
  }

  increaseQuantity(item: OrderItem) {
    if (!item) return;
    this.cartService.addToCart(item);
    this.loadCart();
  }

  decreaseQuantity(item: OrderItem) {
    if (!item) return;
    this.cartService.decreaseQuantity(item.id!);
    this.loadCart();
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
    this.selectedItem = null;
  }

  toggleCheckout() {
    this.showCheckoutForm = !this.showCheckoutForm;
  }

  placeOrder(form: NgForm) {
    if (form.invalid) return;

    if (!this.auth.currentUser) {
      this.showToast('❌ You must be logged in to place an order.');
      return;
    }

    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();

    const order: Order = {
  id: orderId,
  userId: this.auth.currentUser.uid,
  fullName: this.checkoutData.name || this.auth.currentUser.displayName || 'N/A',
  email: this.checkoutData.email || this.auth.currentUser.email || 'N/A',
  address: this.checkoutData.address || 'N/A',
  phone: this.checkoutData.phone || 'N/A',
  items: this.cartItems,
  products: [...this.cartItems],
  totalPrice: this.getTotal(),
  payment: this.checkoutData.payment || 'Cash on Delivery',
  status: 'new',
  createdAt: new Date()
};


    this.orderService.addOrder(order)
      .then(() => {
        this.cartService.clearCart();
        this.cartItems = [];
        this.selectedItem = null;
        this.showCheckoutForm = false;
        this.showToast(`✅ Order Placed! Order ID: ${orderId}`);
      })
      .catch(err => {
        console.error(err);
        this.showToast('❌ Failed to place order.');
      });
  }

  showToast(message: string) {
    alert(message); // can replace with a nicer toast later
  }
}
