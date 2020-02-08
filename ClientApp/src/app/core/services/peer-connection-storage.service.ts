import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { PeerConnection } from '@models/peer-connection';

@Injectable({
	providedIn: 'root',
})
export class PeerConnectionStorageService {
	private connections: BehaviorSubject<PeerConnection[]> = new BehaviorSubject<PeerConnection[]>(
		[]
	);
	private disconnectedListeners: Subscription[] = [];
	private connectedListeners: Subscription[] = [];

	constructor() {}

	add(connection: PeerConnection) {
		this.connections.next([...this.connections.value, connection]);

		this.disconnectedListeners.push(
			connection.onDisconnected.subscribe((pc) => this.handleOnDisconnected(pc))
		);
		this.connectedListeners.push(
			connection.onConnected.subscribe((pc) => this.handleOnConnected(pc))
		);
	}

	exists(userId: string): boolean {
		return !!this.connections.value.find((con) => con.getReceiver().id === userId);
	}

	remove(userId: string) {
		const connection = this.connections.value.find((con) => con.getReceiver().id === userId);

		console.log(connection);
		if (connection) {
			connection.utilize();
		}

		this.connections.next(
			this.connections.value.filter((con) => con.getReceiver().id !== userId)
		);
	}

	utilize() {
		this.connections.value.forEach((c) => c.utilize());
		this.connections.next([]);

		this.disconnectedListeners.forEach((sub) => sub.unsubscribe());
		this.connectedListeners.forEach((sub) => sub.unsubscribe());
	}

	getAll(): Observable<PeerConnection[]> {
		return this.connections.pipe(filter((connection) => !!connection.length));
	}

	getSync(userId): PeerConnection {
		return this.connections.value.find((con) => con.getReceiver().id === userId);
	}
	getAllSync(): PeerConnection[] {
		return this.connections.value;
	}

	getMainConnection(): Observable<PeerConnection> {
		return this.getAll().pipe(
			map((connections) => {
				return connections.map((con) => {
					return combineLatest([of(con), con.volume]);
				});
			}),
			switchMap((mapped) => combineLatest(mapped)),
			map((a) =>
				a.sort(([pc1, volume1], [pc2, volume2]) => {
					return volume2 - volume1;
				})
			),
			map((a) => a[0][0]),
			distinctUntilChanged(
				(c1, c2) => c1.getReceiver().userName === c2.getReceiver().userName
			)
		);
	}

	private handleOnDisconnected(pc: PeerConnection) {
		this.remove(pc.getReceiver().id);
	}

	private handleOnConnected(pc: PeerConnection) {
		console.info('Successful connection with: ' + pc.getReceiver().userName);
	}
}
