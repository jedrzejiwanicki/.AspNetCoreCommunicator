import { Injectable } from '@angular/core';
import { UserRegistrationDTO } from '../../dtos/UserRegistrationDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpUserService {
	constructor(private httpClient: HttpClient) {}

	public create(payload: UserRegistrationDTO): Observable<User> {
		return this.httpClient.post<User>(`${environment.API_URL}/users`, payload);
	}

	public me(): Observable<User> {
		return this.httpClient.get<User>(`${environment.API_URL}/users/me`);
	}
}
