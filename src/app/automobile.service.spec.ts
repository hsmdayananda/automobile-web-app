import { TestBed } from '@angular/core/testing';

import { AutomobileService } from './automobile.service';

describe('AutomobileService', () => {
  let service: AutomobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
