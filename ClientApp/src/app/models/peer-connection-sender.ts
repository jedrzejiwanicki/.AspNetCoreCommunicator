import { User } from './user';
import { SignalingService } from '../core/services/signaling.service';
import { PeerConnection } from './peer-connection';

export class PeerConnectionSender extends PeerConnection {
	constructor(
		protected me: User,
		protected receiver: User,
		protected stream: MediaStream,
		protected signalingService: SignalingService
	) {
		super(me, receiver, stream, signalingService);
	}
}
