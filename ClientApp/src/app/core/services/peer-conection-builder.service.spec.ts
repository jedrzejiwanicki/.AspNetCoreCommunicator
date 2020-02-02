import { TestBed } from '@angular/core/testing';

import { PeerConectionBuilderService } from './peer-conection-builder.service';

describe('PeerConectionBuilderService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: PeerConectionBuilderService = TestBed.get(PeerConectionBuilderService);
		expect(service).toBeTruthy();
	});
});
