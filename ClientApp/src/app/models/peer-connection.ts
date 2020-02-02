import { SignalingService } from '../core/services/signaling.service';
import { User } from './user';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as hark from 'hark';
import { Harker } from 'hark';

declare let RTCPeerConnection: any;

export class PeerConnection {
	public track: MediaStream;
	public isSpeaking: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public volume: BehaviorSubject<number> = new BehaviorSubject<number>(-Infinity);

	public pc = new RTCPeerConnection({
		offerToReceiveAudio: true,
		offerToReceiveVideo: true,
		iceServers: [
			{ urls: ['stun:stun.services.mozilla.com'] },
			{ urls: ['stun:stun.l.google.com:19302'] },
		],
	});

	private harker: Harker;
	protected subscriptions: Subscription[] = [];
	constructor(
		protected me: User,
		protected receiver: User,
		protected stream: MediaStream,
		protected signalingService: SignalingService
	) {
		this.addStream();
		this.listenToTrack();
	}

	public utilize(): void {
		this.pc.close();
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	public getReceiver(): User {
		return this.receiver;
	}

	private addStream(): void {
		this.pc.addStream(this.stream);
	}

	protected listenToCandidateReceived(): void {
		this.subscriptions.push(
			this.signalingService.onCandidateReceived().subscribe((candidate) => {
				console.info('Candidate received from: ', candidate.sender.userName);

				this.pc.addIceCandidate(new RTCIceCandidate(candidate.candidate));
			})
		);
	}

	protected listenToOnIceCandidate(): void {
		this.pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
			if (event.candidate) {
				console.info('Sending candidate request: ');
				this.signalingService.cadidate(event.candidate, this.receiver, this.me);
			}
		};
	}

	private listenToTrack(): void {
		this.pc.ontrack = (event) => {
			console.info('Remote track received.');

			this.track = event.streams[0];

			this.harker = hark(this.track);

			this.harker.on('speaking', () => this.isSpeaking.next(true));
			this.harker.on('stopped_speaking', () => this.isSpeaking.next(false));
			this.harker.on('volume_change', (volume) => this.volume.next(volume));
		};
	}
}
