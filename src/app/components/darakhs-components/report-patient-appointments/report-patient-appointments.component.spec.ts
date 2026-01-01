import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPatientAppointmentsComponent } from './report-patient-appointments.component';

describe('ReportPatientAppointmentsComponent', () => {
  let component: ReportPatientAppointmentsComponent;
  let fixture: ComponentFixture<ReportPatientAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPatientAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPatientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
