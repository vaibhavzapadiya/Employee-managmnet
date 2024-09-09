// employee-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Department, Employee } from '../models/Employee.models';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, NavbarComponent],
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  employees: Employee[] = [];
  departmentId: number | null = null;
  departments: Department[] = [];

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.departmentId = Number(params.get('id'));
      if (this.departmentId) {
        this.loadEmployees(this.departmentId);
      }
    });
    this.loadDepartments()
  }

  loadEmployees(departmentId: number): void {
    this.employeeService.getEmployeess(departmentId).subscribe({
      next: (data) => {
        this.employees = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  
  }
  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(dept => dept.departmentId === departmentId);
    return department ? department.departmentName : 'Unknown';
  }
  loadDepartments(): void {
    this.employeeService.getDepartments()
      .subscribe({
        next: (departments: Department[]) => {
          this.departments = departments;
          console.log(departments)
        },
        error: (error: any) => {
          console.error('Error fetching departments:', error);
        }
      });
  }
  getIndex(i: number): number {
    return  (i + 1);

}
}
