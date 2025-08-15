// src/app/admin/admin-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from './admin-navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent],
  template: `
    <app-admin-navbar></app-admin-navbar>
    <div class="p-4">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AdminLayoutComponent {}
