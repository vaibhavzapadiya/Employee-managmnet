import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentreportComponent } from './departmentreport.component';

describe('DepartmentreportComponent', () => {
  let component: DepartmentreportComponent;
  let fixture: ComponentFixture<DepartmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
