import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomDetails } from '../../models';
import { environment } from '../../../environments/environment';
import { JoinRoomRequestDTO } from '../../dtos/JoinRoomRequestDTO';

@Injectable({
	providedIn: 'root',
})
export class HttpRoomService {
	constructor(private httpClient: HttpClient) {}

	join(payload: JoinRoomRequestDTO) {
		return this.httpClient.post<Room>(`${environment.API_URL}/rooms/join`, payload);
	}

	getAllRooms(): Observable<Room[]> {
		return this.httpClient.get<Room[]>(`${environment.API_URL}/rooms`);
	}

	getRoomDetails(name: string): Observable<RoomDetails> {
		return this.httpClient.get<RoomDetails>(`${environment.API_URL}/rooms/details/${name}`);
	}

	isRoomExisting(name: string): Observable<boolean> {
		return this.httpClient.get<boolean>(`${environment.API_URL}/rooms/exists/${name}`);
	}
}
