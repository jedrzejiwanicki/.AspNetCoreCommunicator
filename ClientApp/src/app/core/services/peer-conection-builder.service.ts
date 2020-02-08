import { Injectable } from '@angular/core';

import { SignalingOfferPayload, User } from '../../models';
import { SignalingService } from './signaling.service';
import { PeerConnectionSender } from '../../models/peer-connection-sender';
import { PeerConnectionReceiver } from '../../models/peer-connection-receiver';

@Injectable({
	providedIn: 'root',
})
export class PeerConectionBuilderService {
	constructor(private signalingService: SignalingService) {}

	public createConnectionSender(me: User, user: User, stream: MediaStream) {
		return new PeerConnectionSender(me, user, stream, this.signalingService).createOffer();
	}

	public createConnectionReceiver(offer: SignalingOfferPayload, stream: MediaStream) {
		return new PeerConnectionReceiver(offer.receiver, offer.sender, stream, this.signalingService).onOffer(offer);
	}

}
