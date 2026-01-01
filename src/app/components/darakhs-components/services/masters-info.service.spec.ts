import { TestBed } from '@angular/core/testing';

import { MastersInfoService } from './masters-info.service';

describe('MastersInfoService', () => {
  let service: MastersInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MastersInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
