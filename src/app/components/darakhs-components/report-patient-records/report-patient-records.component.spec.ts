import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPatientRecordsComponent } from './report-patient-records.component';

describe('ReportPatientRecordsComponent', () => {
  let component: ReportPatientRecordsComponent;
  let fixture: ComponentFixture<ReportPatientRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPatientRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPatientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
