import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Chart,  ChartData, ChartOptions,ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController  } from 'chart.js';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ChartType } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend,BarController);
@Component({
  selector: 'app-visuilization',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './visuilization.component.html',
  styleUrl: './visuilization.component.css'
})
export class VisuilizationComponent implements OnInit,AfterViewInit{
  @ViewChild('barChart') barChart: ElementRef<HTMLCanvasElement> | undefined;
  public chart: Chart<'bar', number[]> | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.employeeService.getEmployeeCountByGender().subscribe(data => {
      this.createChart(data);
    });
  }

  private createChart(data: any[]): void {
    const labels = data.map(item => item.gender);
    const counts = data.map(item => item.employeeCount);

    const canvas = this.barChart?.nativeElement;

    if (canvas) {
      this.chart = new Chart<'bar', number[]>(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Employee Count',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}

