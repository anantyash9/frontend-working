import { TestBed } from '@angular/core/testing';

import { QuarkusService } from './quarkus.service';

describe('QuarkusService', () => {
  let service: QuarkusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuarkusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
