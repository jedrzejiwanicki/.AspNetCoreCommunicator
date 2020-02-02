import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Observable } from 'rxjs';
import { selectAuthUserLoggedIn } from '@store/selectors/auth.selectors';
import { LogoutAction } from '@store/actions/auth';
import { selectMeUser } from '@store/selectors/me';
import { User } from '@models/user';

@Component({
	selector: 'cm-main-nav',
	styleUrls: ['./main-nav.component.scss'],
	templateUrl: 'main-nav.component.html',
})
export class MainNavComponent {
	constructor(private store: Store<AppState>) {}

	isLoggedIn(): Observable<boolean> {
		return selectAuthUserLoggedIn(this.store);
	}

	getUser(): Observable<User> {
		return selectMeUser(this.store);
	}

	logOut(): void {
		this.store.dispatch(new LogoutAction());
	}
}
