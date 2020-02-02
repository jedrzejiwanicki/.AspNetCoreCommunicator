import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { FetchRoomDetailsAction } from '@store/actions/rooms';
import { ActivatedRoute } from '@angular/router';
import { combineAll, filter, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { selectMeUserId } from '@store/selectors/me';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { PeerConnection } from '@models/peer-connection';
import { PeerConnectionManager } from '@services/peer-connection-manager.service';
import { PeerConnectionStorageService } from '@services/peer-connection-storage.service';

@Component({
	selector: 'cm-room-page',
	templateUrl: './room-page.component.html',
	styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit {
	public connections: Observable<PeerConnection[]> = this.peerConnectionStorageService.getAll();
	public subscriptions: Subscription[] = [];
	constructor(
		private store: Store<AppState>,
		private route: ActivatedRoute,
		private peerConnectionManager: PeerConnectionManager,
		private peerConnectionStorageService: PeerConnectionStorageService
	) {}

	ngOnInit() {
		this.store.dispatch(new FetchRoomDetailsAction(this.route.snapshot.params.name));

		this.subscriptions.push(
			selectMeUserId(this.store).subscribe((id) => {
				this.peerConnectionManager.start(this.route.snapshot.params.name);
			})
		);
	}

	getMainVideoStream(): Observable<PeerConnection> {
		return this.peerConnectionStorageService.getMainConnection();
	}

	ngOnDestroy() {
		this.peerConnectionManager.utilize();
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}
