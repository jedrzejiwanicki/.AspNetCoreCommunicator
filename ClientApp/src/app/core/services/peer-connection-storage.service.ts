import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { PeerConnection } from '@models/peer-connection';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PeerConnectionStorageService {
	private connections: BehaviorSubject<PeerConnection[]> = new BehaviorSubject<PeerConnection[]>(
		[]
	);
	constructor() {}

	add(connection: PeerConnection) {
		this.connections.next([...this.connections.value, connection]);
	}

	remove(userId: string) {
		const connection = this.connections.value.find((con) => con.getReceiver().id === userId);

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
	}

	getAll(): Observable<PeerConnection[]> {
		return this.connections.pipe(filter((connection) => !!connection.length));
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
}
