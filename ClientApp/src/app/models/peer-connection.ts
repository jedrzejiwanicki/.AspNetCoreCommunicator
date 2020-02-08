import { SignalingService } from '../core/services/signaling.service';
import { User } from './user';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import * as hark from 'hark';
import { Harker } from 'hark';
import { SignalingOfferPayload } from '@models/signaling-offer-payload';

declare let RTCPeerConnection: any;

export class PeerConnection {
	public track: MediaStream;
	public isSpeaking: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public volume: BehaviorSubject<number> = new BehaviorSubject<number>(-Infinity);
	public onConnected: Subject<PeerConnection> = new Subject<PeerConnection>();
	public onDisconnected: Subject<PeerConnection> = new Subject<PeerConnection>();
	public offer: SignalingOfferPayload;

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
		this.listenToCandidateReceived();
		this.listenToOnIceCandidate();
		this.listenToAnwser();
		this.listenToTrack();
		this.listenToConnectionEvents();
	}

	public utilize(): void {
		this.pc.close();
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	public getReceiver(): User {
		return this.receiver;
	}

	public getRequester(): User {
		return this.me;
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

	protected listenToConnectionEvents(): void {
		this.pc.onconnectionstatechange = (event: Event) => {
			switch ((event.target as RTCPeerConnection).connectionState) {
				case 'connected':
					this.onConnected.next(this);
					break;
				case 'disconnected':
					console.log('dscnt');
					this.onDisconnected.next(this);
					break;
			}
		};
	}

	public onOffer(offer: SignalingOfferPayload): PeerConnection {
		console.info('Offer Received from: ', offer.sender.userName);

		this.pc.setRemoteDescription(new RTCSessionDescription(offer));

		this.pc.createAnswer(
			(answer) => {
				this.pc.setLocalDescription(answer);

				this.signalingService.answer(answer, offer.sender, offer.receiver);
			},
			function(error) {
				alert('Error when creating an answer');
			}
		);

		return this;
	}

	public createOffer(): PeerConnection {
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

		return this;
	}

	public update(stream: MediaStream): void {
		this.pc.addStream(stream);
		this.createOffer();
	}

	private listenToAnwser(): void {
		this.subscriptions.push(
			this.signalingService.onUserAnswer().subscribe((answer) => {
				console.info('Answer Received from: .', answer.sender.userName);
				this.pc.setRemoteDescription(new RTCSessionDescription(answer));
			})
		);
	}

	private listenToTrack(): void {
		this.pc.ontrack = (event) => {
			this.track = event.streams[0];

			if (event.streams[0].getAudioTracks()[0]) {
				this.harker = hark(this.track);

				this.harker.on('speaking', () => this.isSpeaking.next(true));
				this.harker.on('stopped_speaking', () => this.isSpeaking.next(false));
				this.harker.on('volume_change', (volume) => this.volume.next(volume));
			}
		};
	}
}
