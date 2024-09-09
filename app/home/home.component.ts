import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { EmployeeService } from '../services/employee.service';
import { Department, DepartmentalReport, Employee } from '../models/Employee.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewComponent } from "../overview/overview.component";
import { VisuilizationComponent } from "../visuilization/visuilization.component";
import { EmployeePerformanceChartComponent } from "../employee-performance-chart/employee-performance-chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, OverviewComponent, VisuilizationComponent, EmployeePerformanceChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected from styleUrl to styleUrls
})
export class HomeComponent implements OnInit {
  reports: DepartmentalReport[] = [];
  employees: Employee[] = [];
  selectedDepartment: DepartmentalReport | null = null;
  selectedProfile: Employee | null = null;
  showModal = false;
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
    this.loadDepartments();
    this.loadDepartmentalReport();
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(dept => dept.departmentId === departmentId);
    return department ? department.departmentName : 'Unknown';
  }

  loadDepartments(): void {
    this.employeeService.getDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
  
      },
      error: (error: any) => {
        console.error('Error fetching departments:', error);
      }
    });
  }

  loadDepartmentalReport(): void {
    this.employeeService.getDepartmentalReport().subscribe({
      next: (data) => {
        this.reports = data;
  
      },
      error: (error) => {
        console.error('Error fetching departmental report', error);
      }
    });
  }

  loadEmployees(departmentId: number): void {
    this.employeeService.getEmployeess(departmentId).subscribe({
      next: (data) => {
        this.employees = data;
        // Find the selected department
        this.selectedDepartment = this.reports.find(report => report.departmentId === departmentId) || null;
      
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      }
    });
  }

  openModal(departmentId: number): void {
    this.loadEmployees(departmentId);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}