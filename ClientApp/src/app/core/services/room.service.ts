import { Injectable } from '@angular/core';
import { HttpRoomService } from '../http/http-room.service';
import { Observable } from 'rxjs';
import { Room } from '../../models';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class RoomService {
	public connectedRoom: Room;

	constructor(private httpRoomService: HttpRoomService) {}

	join(userId: string, roomName: string): Observable<Room> {
		return this.httpRoomService.join({ userId, roomName }).pipe(
			tap((room) => {
				this.connectedRoom = room;
			})
		);
	}
}
