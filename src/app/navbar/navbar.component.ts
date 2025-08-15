import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" routerLink="/products">🛒 My Shop</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto align-items-center">
      
        <li class="nav-item">
          <button class="btn btn-light" (click)="logout()">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  `,
  styles: [`
    .navbar-nav .nav-link.active {
      font-weight: bold;
      border-bottom: 2px solid white;
    }
  `]
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
