import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTreatmentComponent } from './show-treatment.component';

describe('ShowTreatmentComponent', () => {
  let component: ShowTreatmentComponent;
  let fixture: ComponentFixture<ShowTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
