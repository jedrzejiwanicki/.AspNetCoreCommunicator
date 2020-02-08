import { SignalingService } from '../core/services/signaling.service';
import { PeerConnection } from './peer-connection';
import { SignalingOfferPayload } from './signaling-offer-payload';
import { User } from '@models/user';

export class PeerConnectionReceiver extends PeerConnection {
	constructor(
		protected me: User,
		protected receiver: User,
		protected stream: MediaStream,
		protected signalingService: SignalingService
	) {
		super(me, receiver, stream, signalingService);
	}
}
