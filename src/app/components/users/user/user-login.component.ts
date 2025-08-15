import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.errorMsg = '';
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter email and password';
      return;
    }
    this.loading = true;
    try {
      await this.authService.loginWithEmail(this.email, this.password);
      this.router.navigate(['/user/dashboard']);
    } catch (error: any) {
      this.errorMsg = error.message || 'Login failed';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
