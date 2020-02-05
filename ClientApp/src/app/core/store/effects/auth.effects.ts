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
	LogoutSuccessAction, SignUpAction,
	SignUpFailureAction,
	SignUpSuccessAction,
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

	@Effect()
	$signup = this.actions$.pipe(
		ofType(AuthActionType.SignUp),
		switchMap((action: SignUpAction) =>
			this.authService.signup(action.payload).pipe(
				tap(() => this.router.navigateByUrl('/auth/login')),
				map(() => new SignUpSuccessAction()),
				catchError(() => of(new SignUpFailureAction()))
			)
		)
	);
}
