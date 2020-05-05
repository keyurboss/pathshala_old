import { TestBed } from '@angular/core/testing';

import { BasicFunctionsService } from './basic-functions.service';

describe('BasicFunctionsService', () => {
  let service: BasicFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
