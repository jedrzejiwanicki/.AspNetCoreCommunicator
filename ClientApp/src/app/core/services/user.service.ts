import { Injectable } from '@angular/core';
import { HttpUserService } from '../http/http-user.service';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { SignalRManager } from './signal-r-manager.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public user: User;

	constructor(
		private httpUserService: HttpUserService,
		private signalRManager: SignalRManager,
		private store: Store<AppState>
	) {}

	create(name: string): Observable<User> {
		return this.httpUserService
			.create({ name, connectionId: this.signalRManager.getConnectionId() })
			.pipe(
				tap((user) => {
					this.user = user;
				})
			);
	}

	public isAuthenticated(): Observable<boolean> {
		return this.store.select((state) => state.auth.isUserLoggedIn);
	}
}
