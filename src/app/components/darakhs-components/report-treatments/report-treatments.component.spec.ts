import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTreatmentsComponent } from './report-treatments.component';

describe('ReportTreatmentsComponent', () => {
  let component: ReportTreatmentsComponent;
  let fixture: ComponentFixture<ReportTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
