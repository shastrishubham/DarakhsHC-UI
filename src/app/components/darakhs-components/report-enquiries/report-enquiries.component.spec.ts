import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEnquiriesComponent } from './report-enquiries.component';

describe('ReportEnquiriesComponent', () => {
  let component: ReportEnquiriesComponent;
  let fixture: ComponentFixture<ReportEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEnquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
