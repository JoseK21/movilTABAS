import { TestBed } from '@angular/core/testing';

import { ServiceSignUpService } from './service-sign-up.service';

describe('ServiceSignUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceSignUpService = TestBed.get(ServiceSignUpService);
    expect(service).toBeTruthy();
  });
});
