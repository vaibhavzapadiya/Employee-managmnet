import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuilizationComponent } from './visuilization.component';

describe('VisuilizationComponent', () => {
  let component: VisuilizationComponent;
  let fixture: ComponentFixture<VisuilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisuilizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisuilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
