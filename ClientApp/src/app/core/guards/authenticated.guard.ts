import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
	CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAuthUserLoggedIn } from '@store/selectors/auth.selectors';

@Injectable({
	providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
	constructor(private store: Store<AppState>, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.activateIfAuthenticated();
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.activateIfAuthenticated();
	}

	private activateIfAuthenticated() {
		return selectAuthUserLoggedIn(this.store).pipe(
			tap((isAuthenticated) => {
				if (!isAuthenticated) {
					this.router.navigateByUrl('/auth/login');
				}
			})
		);
	}
}
