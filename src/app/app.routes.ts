import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { ProductListComponent } from './models/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { MyOrdersComponent } from './components/users/user-order.component';
import { userAuthGuard } from './guards/user-auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
   {
    path: 'my-orders',
    loadComponent: () => import('./components/users/user-order.component').then(m => m.MyOrdersComponent),
    canActivate: [userAuthGuard] // ✅ This restricts to non-admin users
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'set-password',
    loadComponent: () =>
      import('./components/set-password.component').then(
        m => m.SetPasswordComponent
      )
  },

  // Wildcard fallback
  { path: '**', redirectTo: '' }
];
