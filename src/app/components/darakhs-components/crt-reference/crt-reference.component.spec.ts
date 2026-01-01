import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtReferenceComponent } from './crt-reference.component';

describe('CrtReferenceComponent', () => {
  let component: CrtReferenceComponent;
  let fixture: ComponentFixture<CrtReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrtReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
