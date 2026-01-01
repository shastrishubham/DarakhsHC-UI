import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFollowupDateComponent } from './patient-followup-date.component';

describe('PatientFollowupDateComponent', () => {
  let component: PatientFollowupDateComponent;
  let fixture: ComponentFixture<PatientFollowupDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFollowupDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFollowupDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
