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

		this.init();
	}

	private init(): void {
		this.createOffer();
		this.listenToAnwser();
		this.listenToCandidateReceived();
		this.listenToOnIceCandidate();
	}

	private createOffer(): void {
		this.pc.createOffer(
			(offer) => {
				this.signalingService.offer(offer, this.receiver, this.me);
				this.pc.setLocalDescription(offer);

				console.info('Created offer for: ', this.receiver.userName);
			},
			function(error) {
				console.warn('Error when creating an offer');
			}
		);
	}

	private listenToAnwser(): void {
		this.subscriptions.push(
			this.signalingService.onUserAnswer().subscribe((answer) => {
				console.info('Answer Received from: .', answer.sender.userName);
				this.pc.setRemoteDescription(new RTCSessionDescription(answer));
			})
		)
	}
}
