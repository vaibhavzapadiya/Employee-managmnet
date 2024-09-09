import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee, salary } from '../models/Employee.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-salary-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './salary-report.component.html',
  styleUrl: './salary-report.component.css'
})
export class SalaryReportComponent {

  employees: salary[] = [];
  minSalary?: number;
  maxSalary?: number;
  isLoading = false;
  searchTerm: string = '';
  selectedDepartment: number | null = null;
  totalPages: number = 1;
  page: number = 1; // Current page number
  pageSize: number = 10; // Number of items per page


  constructor(private employeeService: EmployeeService) { }

  onFilter() {
    this.isLoading = true;
    this.employeeService.getFilteredEmployees(this.minSalary, this.maxSalary).subscribe({
      next: (data) => {
        this.employees = data;
        console.log(data)
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching employees', error);
        this.isLoading = false;
      }
    });
  }
  downloadPDF() {
    this.isLoading = true;
    this.employeeService.getFilteredEmployees(this.minSalary, this.maxSalary).subscribe({
      next: (data) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const padding=10;
        const tableWidth = pageWidth - 2 * margin;
        const columnCount = 5;

        // Explicit column widths (in mm)
        const columnWidths = [40, 60, 50, 30, 40]; // Widths for Name, Email, Gender, Salary

        const rowHeight = 10; // Height of each row
        const headerHeight = 20; // Height of the header row

        // Title
        doc.setFontSize(18);
        doc.text('Employee Report', margin, margin);

        // Table Header
        doc.setFontSize(12);
        doc.setFillColor(100, 100, 100); // Light gray background for header
        let headerY = margin +20;
        let x = margin;
      
        doc.rect(x, headerY, columnWidths[0], headerHeight, 'F'); // First header cell
        doc.rect(x + columnWidths[0], headerY, columnWidths[1], headerHeight, 'F'); // Second header cell
        doc.rect(x + columnWidths[0] + columnWidths[1], headerY, columnWidths[2], headerHeight, 'F'); // Third header cell
        doc.rect(x + columnWidths[0] + columnWidths[1] + columnWidths[2], headerY, columnWidths[3], headerHeight, 'F'); // Fourth header cell
        doc.rect(x + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], headerY, columnWidths[4], headerHeight, 'F'); // Fifth header cell
        doc.setTextColor(0, 0, 0); // Black text color
        doc.text('Name', x + 2, headerY + 7);
        doc.text('Email', x + columnWidths[0] + 2, headerY + 7);
        doc.text('Gender', x + columnWidths[0] + columnWidths[1] + 2, headerY + 7);
        doc.text('Salary', x + columnWidths[0] + columnWidths[1] + columnWidths[2] + 2, headerY + 7);

        // Table Content
        let y = headerY + headerHeight; // Starting Y position for table content
        data.forEach(employee => {
          doc.text(employee.firstName + ' ' + employee.lastName, margin, y);
          doc.text(employee.email, margin + columnWidths[0], y);
          doc.text(employee.gender, margin + columnWidths[0] + columnWidths[1], y);
          doc.text(employee.salary.toFixed(2), margin + columnWidths[0] + columnWidths[1] + columnWidths[2], y);
          y += rowHeight; // Move to the next row

          // Add a new page if the content exceeds the page height
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
            doc.text('Employee Report', margin, margin);

            // Re-draw the table header on the new page
            headerY = margin + 20;
            x = margin;
            doc.setFontSize(12);
            doc.setFillColor(200, 200, 200);
            doc.rect(x, headerY, columnWidths[0], headerHeight, 'F');
            doc.rect(x + columnWidths[0], headerY, columnWidths[1], headerHeight, 'F');
            doc.rect(x + columnWidths[0] + columnWidths[1], headerY, columnWidths[2], headerHeight, 'F');
            doc.rect(x + columnWidths[0] + columnWidths[1] + columnWidths[2], headerY, columnWidths[3], headerHeight, 'F');
            doc.rect(x + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], headerY, columnWidths[4], headerHeight, 'F');
            doc.setTextColor(0, 0, 0);
            doc.text('Name', x + 2, headerY + 7);
            doc.text('Email', x + columnWidths[0] + 2, headerY + 7);
            doc.text('Gender', x + columnWidths[0] + columnWidths[1] + 2, headerY + 7);
            doc.text('Salary', x + columnWidths[0] + columnWidths[1] + columnWidths[2] + 2, headerY + 7);
          }
        });

        doc.save('employees.pdf');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching employees for PDF', error);
        this.isLoading = false;
      }
    });
  }
}