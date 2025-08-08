import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h1>🔐 Login to Your Account</h1>
        <p class="subtext">Access your dashboard and manage products</p>

        <form (ngSubmit)="login()" class="login-form">
          <div class="form-group">
            <input [(ngModel)]="email" name="email" type="email" placeholder="✉️ Email" required />
          </div>

          <div class="form-group">
            <input [(ngModel)]="password" name="password" type="password" placeholder="🔒 Password" required />
          </div>

          <button type="submit" class="btn primary-btn">Login</button>
        </form>

        <div class="divider">OR</div>

        <button (click)="loginWithGoogle()" class="btn google-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
          Continue with Google
        </button>
      </div>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; }
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      padding: 16px;
      font-family: 'Segoe UI', sans-serif;
    }

    .login-card {
      background: white;
      padding: 40px 30px;
      border-radius: 16px;
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
      max-width: 420px;
      width: 100%;
      text-align: center;
    }

    h1 {
      margin-bottom: 12px;
      color: #333;
    }

    .subtext {
      color: #777;
      margin-bottom: 24px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    input {
      width: 100%;
      padding: 12px 14px;
      font-size: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      transition: border 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #3f51b5;
    }

    .btn {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .primary-btn {
      background: #3f51b5;
      color: white;
      border: none;
    }

    .primary-btn:hover {
      background: #2c3e9f;
    }

    .google-btn {
      background: white;
      border: 1px solid #ccc;
    }

    .google-btn img {
      width: 20px;
      margin-right: 10px;
    }

    .divider {
      margin: 20px 0;
      font-size: 14px;
      color: #888;
      position: relative;
    }

    .divider::before, .divider::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background: #ccc;
    }

    .divider::before { left: 0; }
    .divider::after { right: 0; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.loginWithEmail(this.email, this.password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err: { message: any; }) => alert(err.message));
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err: { message: any; }) => alert(err.message));
  }
}
