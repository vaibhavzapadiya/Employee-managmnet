import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department, Employee } from '../../models/Employee.models';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeePerformanceChartComponent } from '../../employee-performance-chart/employee-performance-chart.component';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  departments: Department[] = [];
  userRole: string | null = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['',],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,]],
      gender: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      mobileNum: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      departmentId: [null, Validators.required],
      isActive: [true],
      createdby: ['', Validators.required],
      Updatedby: ['', Validators.required]
    });
    this.loadDepartments();
    this.userRole = localStorage.getItem('userRole');
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.http.post('https://localhost:7149/api/Employee', this.employeeForm.value)
      .subscribe({
        next: (data) => {
          alert("successfully added")
          this.router.navigateByUrl('employees')
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding employee:', error.error);
          // Display or handle validation errors
          alert("not added")
          if (error.error && error.error.errors) {
            console.log('Validation Errors:', error.error.errors);
          }
        }
      });
  }
  loadDepartments(): void {
    this.employeeService.getDepartments()
      .subscribe({
        next: (departments: Department[]) => {
          this.departments = departments;
        },
        error: (error: any) => {
          console.error('Error fetching departments:', error);
        }
      });
  }
}
