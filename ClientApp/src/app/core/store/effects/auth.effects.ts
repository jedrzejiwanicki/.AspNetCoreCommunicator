import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
	AuthActionType,
	LoginAction,
	LoginFailureAction,
	LoginSuccessAction,
	LogoutSuccessAction,
} from '../actions/auth';
import { AuthService } from '../../services/auth.service';
import { MeRequestAction } from '@store/actions/me';

@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private router: Router
	) {}

	@Effect()
	$logout = this.actions$.pipe(
		ofType(AuthActionType.Logout),
		tap(() => {
			this.router.navigateByUrl('/');
			sessionStorage.removeItem('token');
		}),
		map(() => new LogoutSuccessAction())
	);
	@Effect()
	$login = this.actions$.pipe(
		ofType(AuthActionType.Login),
		switchMap((action: LoginAction) => {
			return this.authService.login(action.payload).pipe(
				tap((response) => {
					sessionStorage.setItem('token', response.token);
				}),
				map((response) => new LoginSuccessAction(response)),
				catchError(() => of(new LoginFailureAction()))
			);
		})
	);
	@Effect()
	$loginSuccess = this.actions$.pipe(
		ofType(AuthActionType.LoginSuccess),
		map(() => new MeRequestAction())
	);
}
