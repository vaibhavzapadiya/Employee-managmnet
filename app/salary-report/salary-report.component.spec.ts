import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryReportComponent } from './salary-report.component';

describe('SalaryReportComponent', () => {
  let component: SalaryReportComponent;
  let fixture: ComponentFixture<SalaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
