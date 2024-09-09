import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePerformanceChartComponent } from './employee-performance-chart.component';

describe('EmployeePerformanceChartComponent', () => {
  let component: EmployeePerformanceChartComponent;
  let fixture: ComponentFixture<EmployeePerformanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePerformanceChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePerformanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
