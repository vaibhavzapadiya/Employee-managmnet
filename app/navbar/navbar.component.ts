import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userRole: string | null = '';
  http=inject(HttpClient)
  router=inject(Router)

  ngOnInit(): void {
 
    this.userRole = localStorage.getItem('userRole');
  }

  logout() {

 

    if (confirm('Are you sure you want to Logout?')) 
      // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
      
      // Optionally, you can also clear other related session data here
      
      // Redirect to the login page or home page
      this.router.navigateByUrl('/login');
    }
  
}