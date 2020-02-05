import { Action } from '@ngrx/store';

import {
	LoginRequestPayload,
	LoginRequestResponse,
	SignUpRequestPayload,
} from '../../services/auth.service';

export enum AuthActionType {
	Login = '[Auth] Login',
	LoginSuccess = '[Auth] Login Success',
	LoginFailure = '[Auth] Login Failure',
	LoginEnd = '[Auth] Login End',
	Logout = '[Auth] Logout',
	LogoutSuccess = '[Auth] Logout Success',
	SignUp = '[Auth] Sign Up Request',
	SignUpSuccess = '[Auth] Sign Up Success',
	SignUpFailure = '[Auth] Sign Up Failure',
}

export class LoginAction implements Action {
	readonly type: AuthActionType = AuthActionType.Login;

	constructor(public payload: LoginRequestPayload) {}
}

export class LoginSuccessAction implements Action {
	readonly type: AuthActionType = AuthActionType.LoginSuccess;

	constructor(public payload: LoginRequestResponse) {}
}

export class LoginFailureAction implements Action {
	readonly type: AuthActionType = AuthActionType.LoginFailure;
	readonly payload = {};
}

export class LogoutAction implements Action {
	readonly type: AuthActionType = AuthActionType.Logout;
	readonly payload = {};
}

export class LogoutSuccessAction implements Action {
	readonly type: AuthActionType = AuthActionType.LogoutSuccess;
	readonly payload = {};
}

export class LoginEndAction implements Action {
	readonly type: AuthActionType = AuthActionType.LoginEnd;
	readonly payload = {};
}

export class SignUpAction implements Action {
	readonly type: AuthActionType = AuthActionType.SignUp;
	constructor(public payload: SignUpRequestPayload) {}
}
export class SignUpSuccessAction implements Action {
	readonly type: AuthActionType = AuthActionType.SignUpSuccess;
	readonly payload = {};
}
export class SignUpFailureAction implements Action {
	readonly type: AuthActionType = AuthActionType.SignUpFailure;
	readonly payload = {};
}

export type AuthAction =
	| LoginAction
	| LoginSuccessAction
	| LoginFailureAction
	| LoginEndAction
	| LogoutAction
	| LogoutSuccessAction
	| SignUpAction
	| SignUpSuccessAction
	| SignUpFailureAction;
