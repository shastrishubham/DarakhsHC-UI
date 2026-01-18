import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtEnquiryComponent } from './crt-enquiry.component';

describe('CrtEnquiryComponent', () => {
  let component: CrtEnquiryComponent;
  let fixture: ComponentFixture<CrtEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrtEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
