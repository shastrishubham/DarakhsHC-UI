import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtTreatmentComponent } from './crt-treatment.component';

describe('CrtTreatmentComponent', () => {
  let component: CrtTreatmentComponent;
  let fixture: ComponentFixture<CrtTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrtTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
