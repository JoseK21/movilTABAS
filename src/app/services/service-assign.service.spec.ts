import { TestBed } from '@angular/core/testing';

import { ServiceAssignService } from './service-assign.service';

describe('ServiceAssignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceAssignService = TestBed.get(ServiceAssignService);
    expect(service).toBeTruthy();
  });
});
