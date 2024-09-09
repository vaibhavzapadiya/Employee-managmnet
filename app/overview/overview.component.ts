import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { DepartmentalReport, Employee } from '../models/Employee.models';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  reports: DepartmentalReport[] = [];
  employees: Employee[] = [];
  selectedDepartment: DepartmentalReport | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartmentalReportby();
  }

  loadDepartmentalReportby(): void {
    this.employeeService.getDepartmentalReport().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (error) => {
        console.error('Error fetching departmental report', error);
      }
    });
  }
}
