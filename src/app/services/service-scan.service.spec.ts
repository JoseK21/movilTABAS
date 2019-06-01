import { TestBed } from '@angular/core/testing';

import { ServiceScanService } from './service-scan.service';

describe('ServiceScanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceScanService = TestBed.get(ServiceScanService);
    expect(service).toBeTruthy();
  });
});
