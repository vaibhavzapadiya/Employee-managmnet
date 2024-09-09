import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-employee-performance-chart',
  standalone: true,
  imports: [ BrowserModule,CommonModule,
  ],
  templateUrl: './employee-performance-chart.component.html',
  styleUrl: './employee-performance-chart.component.css'
})
export class EmployeePerformanceChartComponent {
  public chartData: ChartData<'bar'> = {
    labels: [], // to be populated dynamically
    datasets: [{
      label: 'Performance Score',
      data: [], // to be populated dynamically
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    // Example data; replace with actual data fetch logic
    this.chartData = {
      labels: ['Employee 1', 'Employee 2', 'Employee 3'], // Example labels
      datasets: [{
        label: 'Performance Score',
        data: [65, 59, 80], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }
}
