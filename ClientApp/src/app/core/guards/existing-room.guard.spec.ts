import { TestBed, async, inject } from '@angular/core/testing';

import { ExistingRoomGuard } from './existing-room.guard';

describe('ExistingRoomGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExistingRoomGuard]
    });
  });

  it('should ...', inject([ExistingRoomGuard], (guard: ExistingRoomGuard) => {
    expect(guard).toBeTruthy();
  }));
});
