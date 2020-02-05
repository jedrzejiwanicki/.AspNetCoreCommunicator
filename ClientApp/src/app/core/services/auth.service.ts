import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../models';

export interface LoginRequestPayload {
	userName: string;
	password: string;
	connectionId: string;
}

export interface SignUpRequestPayload {
	name: string;
	password: string;
}

export interface LoginRequestResponse {
	token: string;
	user: User;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly BASE_URL: string = `${environment.API_URL}/auth`;

	constructor(private httpClient: HttpClient) {}

	login(payload: LoginRequestPayload): Observable<LoginRequestResponse> {
		return this.httpClient.post<LoginRequestResponse>(`${this.BASE_URL}/login`, payload);
	}

	signup(payload: SignUpRequestPayload): Observable<User> {
		return this.httpClient.post<User>(`${environment.API_URL}/users`, payload);
	}
}
