import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-4" style="min-width: 350px; border-radius: 10px;">
      <div class="text-center mb-4">
        <h3 class="fw-bold text-primary">Admin Login</h3>
        <p class="text-muted">Sign in to manage your store</p>
      </div>

      <form (ngSubmit)="loginEmailPassword()" autocomplete="off">
        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input type="email" [(ngModel)]="email" name="email" class="form-control" placeholder="Enter your email" required autocomplete="new-email">
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input type="password" [(ngModel)]="password" name="password" class="form-control" placeholder="Enter your password" required autocomplete="new-password">
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
  `,
  styles: [`
    .vh-100 { height: 100vh; }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async loginEmailPassword() {
    try {
      await this.authService.loginWithEmail(this.email, this.password);
    } catch (err) {
      console.error(err);
      alert('Invalid email or password');
    }
  }
}
