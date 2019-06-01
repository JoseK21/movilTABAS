import { TestBed } from '@angular/core/testing';

import { ServiceLogInService } from './service-log-in.service';

describe('ServiceLogInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceLogInService = TestBed.get(ServiceLogInService);
    expect(service).toBeTruthy();
  });
});
