import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>🔐 Set Your Password</h2>
      <p *ngIf="email">Logged in as: <strong>{{ email }}</strong></p>
      <p>This allows you to log in using your email and password later.</p>

      <form (ngSubmit)="linkPassword()" *ngIf="email">
        <input
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="Enter password"
          required
        />
        <button type="submit" [disabled]="loading">
          {{ loading ? 'Linking...' : 'Set Password' }}
        </button>
      </form>

      <p *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 60px auto;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
      background: #fff;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    input, button {
      width: 100%;
      margin-top: 12px;
      padding: 10px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    button {
      background-color: #3f51b5;
      color: white;
      cursor: pointer;
      margin-top: 16px;
    }

    button:hover {
      background-color: #2c3e9f;
    }
  `]
})
export class SetPasswordComponent {
  password = '';
  message = '';
  loading = false;
  email = '';

  constructor(private authService: AuthService) {
    const currentUser = this.authService.currentUser;
    this.email = currentUser?.email || '';
  }

  linkPassword() {
    if (!this.email) {
      this.message = '❌ No email found for current user.';
      return;
    }

    this.loading = true;
    this.authService.linkEmailPassword(this.email, this.password)
      .then(() => {
        this.message = '✅ Password linked successfully!';
        this.password = '';
      })
      .catch((error) => {
        if (error.code === 'auth/credential-already-in-use') {
          this.message = '⚠️ This email is already linked to another account.';
        } else if (error.code === 'auth/requires-recent-login') {
          this.message = '⚠️ Please re-authenticate to link credentials.';
        } else {
          this.message = `❌ Error: ${error.message || error}`;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
