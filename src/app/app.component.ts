// src/app/app.component.ts

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ yeh sahi hai

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // ✅ correct imports
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {  // ✅ class ka naam AppComponent hona chahiye
  authService = inject(AuthService);
  isAdmin = this.authService.isAdmin$; // observable boolean
}
