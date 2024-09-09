import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Department, Employee } from '../../models/Employee.models';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Observable } from 'rxjs';
import { EmployeePerformanceChartComponent } from "../../employee-performance-chart/employee-performance-chart.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent, EmployeePerformanceChartComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  editForm: FormGroup;
  isEditing = false;
  currentEmployeeId: number | undefined;
  searchTerm: string = '';
  selectedDepartment: number | null = null;
  page: number = 1; // Current page number
  pageSize: number = 10; // Number of items per page
  totalPages: number = 1;
  itemsPerPageOptions: number[] = [10, 20, 50, 100]; // Options for items per page
  sortColumn: any;
  sortDirection: any;
  totalItems!: number ;
  totalEmployeeCount: number| null = null;
sortBy: any;
uniqueTags: string[] = [];
selectedTag: string | null = null;
selectedStatus: 'active' | 'inactive' | null = null;
selectedProfile: Employee | null = null;
userRole: string | null = '';
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      mobileNum: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      departmentId: [null, Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadEmployees(this.page, this.pageSize);
    this.loadTotalEmployeeCount();
    this.loadDepartments()
    this.userRole = localStorage.getItem('userRole');
  }

  loadEmployees(page: number, pageSize: number,): void {
    this.employeeService.getEmployees(page, pageSize, this.searchTerm, this.selectedDepartment,)
      .subscribe(data => {
        this.employees = data.employees;
        this.totalPages = data.totalPages;
      });
  }

  applyFilters(): void {
    this.page = 1; // Reset to first page on filter change
    this.loadEmployees(this.page, this.pageSize);
  }

  editEmployee(employee: Employee): void {
    this.currentEmployeeId = employee.employeeId;
    this.editForm.patchValue(employee);
    this.isEditing = true;
  }

  onSubmit(): void {
    if (this.editForm.valid && this.currentEmployeeId !== undefined) {
      this.employeeService.updateEmployee(this.currentEmployeeId, this.editForm.value)
        .subscribe({
          next: () => {
            console.log('Employee updated successfully!');
            this.isEditing = false;
            this.loadEmployees(this.page, this.pageSize); // Re-fetch to update list
          },
          error: (error) => {
            console.error('Error updating employee', error);
          }
        });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm.reset();
  }
  

  deleteEmployee(employeeId: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
  
    if (confirmed) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          console.log('Employee deleted successfully!');
          this.loadEmployees(this.page, this.pageSize);
          this.loadTotalEmployeeCount()// Re-fetch to update list
        },
        error: (error) => {
          console.error('Error deleting employee', error);
        }
      });
    }
  }
  

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(dept => dept.departmentId === departmentId);
    return department ? department.departmentName : 'Unknown';
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadEmployees(this.page, this.pageSize);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadEmployees(this.page, this.pageSize);
    }
  }

  onItemsPerPageChange(event: any): void {
    this.pageSize = +event.target.value; // Convert to number
    this.page = 1; // Reset to first page
    this.updateTotalPages();
    this.loadEmployees(this.page, this.pageSize);
  }

  private updateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

 
  getIndex(i: number): number {
    return (this.page - 1) * this.pageSize + (i + 1);

}


viewProfile(employee: Employee) {
  this.selectedProfile = employee;
}

closeProfile() {
  this.selectedProfile = null;
}
loadTotalEmployeeCount(): void {
  this.employeeService.getTotalEmployeeCount(this.searchTerm, this.selectedDepartment)
    .subscribe(count => {
      this.totalEmployeeCount = count;
    });
}
resetFilters(): void {
  this.searchTerm = '';
  this.selectedDepartment = null;
  this.page = 1;
  this.loadEmployees(this.page, this.pageSize);
  this.loadTotalEmployeeCount();
}

sortEmployees(column: string): void {
  this.sortDirection = this.sortColumn === column ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
  this.sortColumn = column;
  this.employees = this.employees.sort((a, b) => {
    const aValue = a[column as keyof Employee];
    const bValue = b[column as keyof Employee];
    return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * (this.sortDirection === 'asc' ? 1 : -1);
  });
}
extractUniqueTags(): void {
  this.uniqueTags = Array.from(new Set(this.employees.flatMap(emp => emp.tags || [])));
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