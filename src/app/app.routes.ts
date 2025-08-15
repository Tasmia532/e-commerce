import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

// Admin components
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminLoginComponent } from './components/admin-login.component';

// User components
import { UserLoginComponent } from './components/users/user/user-login.component';
import { UserDashboardComponent } from './components/users/user/user-dashboard.component';
import { ProductListComponent } from './models/product-list.component'; // your existing file

import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/users/user-order.component';
import { SetPasswordComponent } from './components/set-password.component';

// Guards
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { userAuthGuard } from './guards/user-auth.guard';

// ✅ Admin guard
const adminGuard = () => {
  const authService = inject(AuthService);
  return authService.isAdmin$.pipe(
    map((isAdmin) => {
      if (!isAdmin) {
        window.location.href = '/admin/login';
        return false;
      }
      return true;
    })
  );
};

export const routes: Routes = [
  // Set password
  { path: 'set-password', component: SetPasswordComponent },

  // Default route → user login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Admin login
  { path: 'admin/login', component: AdminLoginComponent },

  // Admin dashboard with guard
  {
    path: 'admin/dashboard',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
    ]
  },

  // User login
  { path: 'login', component: UserLoginComponent },

{
  path: 'user/dashboard',
  component: UserDashboardComponent,
  canActivate: [userAuthGuard],
  children: [
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'orders', component: MyOrdersComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' }
  ]
}
,

  // Wildcard → fallback to user login
  { path: '**', redirectTo: 'login' },
];
