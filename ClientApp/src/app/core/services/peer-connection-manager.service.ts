import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { SignalingOfferPayload } from '@models/signaling-offer-payload';
import { User } from '@models/user';
import { UserStreamService } from '@services/user-stream.service';
import { SignalingService } from '@services/signaling.service';
import { PeerConnection } from '@models/peer-connection';
import { PeerConectionBuilderService } from '@services/peer-conection-builder.service';
import { selectMeUser } from '@store/selectors/me';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { PeerConnectionStorageService } from '@services/peer-connection-storage.service';

@Injectable({
	providedIn: 'root',
})
export class PeerConnectionManager {
	public subscriptions: Subscription[] = [];
	constructor(
		private userStreamService: UserStreamService,
		private signalingService: SignalingService,
		private peerConnectionBuilder: PeerConectionBuilderService,
		private peerConnectionStorageService: PeerConnectionStorageService,
		private store: Store<AppState>
	) {}

	public start(roomName: string): void {
		this.subscriptions.push(
			this.canBeInitialized().subscribe(([stream, me]) => {
				this.startListeners(stream, me);
				this.signalingService.join(me.id, roomName);
			})
		);
	}

	public utilize(): void {
		this.peerConnectionStorageService.utilize();
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	private startListeners(stream: MediaStream, me: User): void {
		console.log('Starting listeners');

		this.listenToUserRemoved();
		this.listenToUserAdded(stream, me);
		this.listenToUserOffer(stream);
	}

	private canBeInitialized(): Observable<[MediaStream, User]> {
		return combineLatest([this.userStreamService.requestStream(), selectMeUser(this.store)]);
	}

	private listenToUserAdded(stream: MediaStream, me: User): void {
		this.subscriptions.push(
			this.signalingService.onUserAdded().subscribe((user) => {
				console.info('New user added: ', user.userName);

				this.peerConnectionStorageService.add(
					this.peerConnectionBuilder.createConnectionSender(me, user, stream)
				);
			})
		);
	}

	private listenToUserRemoved(): void {
		this.subscriptions.push(
			this.signalingService.onUserRemoved().subscribe((userId) => {
				console.info(`User removed: ${userId}`);

				this.peerConnectionStorageService.remove(userId);
			})
		);
	}

	private listenToUserOffer(stream: MediaStream): void {
		this.subscriptions.push(
			this.signalingService.onUserOffer().subscribe((offer: SignalingOfferPayload) => {
				this.peerConnectionStorageService.add(
					this.peerConnectionBuilder.createConnectionReceiver(offer, stream)
				);
			})
		);
	}
}
