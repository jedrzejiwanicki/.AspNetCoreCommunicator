import { TestBed } from '@angular/core/testing';

import { SignalRManager } from './signal-r-manager.service';

describe('SocketConnectionBuilderService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: SignalRManager = TestBed.get(SignalRManager);
		expect(service).toBeTruthy();
	});
});
