import { TestBed } from '@angular/core/testing';

import { HttpUserService } from './http-user.service';

describe('HttpUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpUserService = TestBed.get(HttpUserService);
    expect(service).toBeTruthy();
  });
});
