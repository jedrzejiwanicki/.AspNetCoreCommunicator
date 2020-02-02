import { User } from './user';
import { SignalingService } from '../core/services/signaling.service';
import { PeerConnection } from './peer-connection';
import { SignalingOfferPayload } from './signaling-offer-payload';

export class PeerConnectionReceiver extends PeerConnection {
	constructor(
		private offer: SignalingOfferPayload,
		protected stream: MediaStream,
		protected signalingService: SignalingService
	) {
		super(offer.receiver, offer.sender, stream, signalingService);

		this.init();
	}

	private init(): void {
		this.onOffer();
		this.listenToCandidateReceived();
		this.listenToCandidateReceived();
		this.listenToOnIceCandidate();
	}

	private onOffer(): void {
		console.info('Offer Received from: ', this.offer.sender.userName);

		this.pc.setRemoteDescription(new RTCSessionDescription(this.offer));

		this.pc.createAnswer(
			(answer) => {
				this.pc.setLocalDescription(answer);

				this.signalingService.answer(answer, this.offer.sender, this.offer.receiver);
			},
			function(error) {
				alert('Error when creating an answer');
			}
		);
	}
}
