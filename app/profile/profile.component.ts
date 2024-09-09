import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userProfile: any = {};
  userRole: string | null = '';
  isVisible: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Get user role and profile information from local storage or API
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole) {
      this.loadUserProfile();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadUserProfile(): void {
    // Replace with your API endpoint to get user profile
    this.http.get<any>('https://localhost:7149/api/Auth/7').subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        // Handle error, maybe redirect or show an error message
      }
    });
  }
}
