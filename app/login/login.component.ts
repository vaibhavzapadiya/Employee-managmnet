import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    setTimeout(() => {
      document.querySelector('.login-container')?.classList.add('visible');
      document.querySelector('h2')?.classList.add('visible');
    }, 100);
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      this.http.post<any>('https://localhost:7149/api/Auth/login', loginData).pipe(
        catchError(error => {
          console.error('Login failed:', error);
          alert("Login failed: Please check your credentials.");
          return of(null); // Return a default value or observable to handle error
        })
      ).subscribe({
        next: (response) => {
          if (response && response.token && response.role) { // Assuming your API returns 'role'
            alert("Login successful");
            
            // Store the token and role in localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userRole', response.role);
            
            // Navigate based on role or default
            this.router.navigateByUrl('home');
          } else {
            alert("Invalid response from server.");
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert("An unexpected error occurred. Please try again.");
        }
      });
    } else {
      alert("Please fill in all fields.");
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
