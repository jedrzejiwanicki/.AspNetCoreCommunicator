import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { skip, take, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UserStreamService } from '@services/user-stream.service';
import { SignalingService } from '@services/signaling.service';
import { PeerConectionBuilderService } from '@services/peer-conection-builder.service';
import { selectMeUser } from '@store/selectors/me';
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
		this.userStreamService.requestStream();

		this.startListeners();

		this.subscriptions.push(
			this.canJoinRoom().subscribe(([me]) => this.signalingService.join(me.id, roomName)),
			this.onStreamChanged().subscribe((stream) => this.updateExistingConnections(stream))
		);
	}

	public utilize(): void {
		this.peerConnectionStorageService.utilize();
		this.unsubscribe();
	}

	private unsubscribe(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	private startListeners(): void {
		this.listenToUserRemoved();
		this.listenToUserAdded();
		this.listenToUserOffer();
	}

	private canJoinRoom() {
		return combineLatest([
			selectMeUser(this.store),
			this.userStreamService.getUserStream(),
		]).pipe(take(1));
	}

	private updateExistingConnections(stream: MediaStream) {
		console.log('THE STREAM HAS CHANGED!');
		const current = [...this.peerConnectionStorageService.getAllSync()];

		current.forEach((pc) => pc.update(stream));
	}
	private onStreamChanged(): Observable<MediaStream> {
		return this.userStreamService.getUserStream().pipe(skip(1));
	}

	private listenToUserAdded(): void {
		this.subscriptions.push(
			this.signalingService
				.onUserAdded()
				.pipe(
					withLatestFrom(this.userStreamService.getUserStream(), selectMeUser(this.store))
				)
				.subscribe(([user, stream, me]) => {
					console.log('Sending offer');
					this.peerConnectionStorageService.add(
						this.peerConnectionBuilder.createConnectionSender(me, user, stream)
					);
				})
		);
	}

	private listenToUserRemoved(): void {
		this.subscriptions.push(
			this.signalingService.onUserRemoved().subscribe((userId) => {
				this.peerConnectionStorageService.remove(userId);
			})
		);
	}

	private listenToUserOffer(): void {
		this.subscriptions.push(
			this.signalingService
				.onUserOffer()
				.pipe(withLatestFrom(this.userStreamService.getUserStream()))
				.subscribe(([offer, stream]) => {
					// If connection exists update the current one or crate new

					if (this.peerConnectionStorageService.exists(offer.sender.id)) {
						this.peerConnectionStorageService.getSync(offer.sender.id).onOffer(offer);
					} else {
						this.peerConnectionStorageService.add(
							this.peerConnectionBuilder.createConnectionReceiver(offer, stream)
						);
					}
				})
		);
	}
}
