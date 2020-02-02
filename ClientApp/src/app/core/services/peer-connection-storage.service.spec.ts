import { TestBed } from '@angular/core/testing';

import { PeerConnectionStorageService } from './peer-connection-storage.service';

describe('PeerConnectionStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeerConnectionStorageService = TestBed.get(PeerConnectionStorageService);
    expect(service).toBeTruthy();
  });
});
