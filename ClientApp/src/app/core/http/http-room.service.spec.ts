import { TestBed } from '@angular/core/testing';

import { HttpRoomService } from './http-room.service';

describe('HttpRoomService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: HttpRoomService = TestBed.get(HttpRoomService);
		expect(service).toBeTruthy();
	});
});
