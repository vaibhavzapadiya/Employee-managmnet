import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { DepartmentalReport } from '../models/Employee.models';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'; 
@Component({
  selector: 'app-departmentreport',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './departmentreport.component.html',
  styleUrl: './departmentreport.component.css'
})
export class DepartmentreportComponent {
  reports: DepartmentalReport[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadDepartmentalReport();
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
  downloadDepartmentalReportPdf() {
    this.employeeService.downloadDepartmentalReportPdf().subscribe(blob => {
      this.downloadFile(blob, 'DepartmentalReport.pdf');
    }, error => {
      console.error('Error downloading departmental report:', error);
    });
  }

  private downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
