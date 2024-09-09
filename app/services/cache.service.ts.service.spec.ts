import { TestBed } from '@angular/core/testing';

import { CacheServiceTsService } from './cache.service.ts.service';

describe('CacheServiceTsService', () => {
  let service: CacheServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
