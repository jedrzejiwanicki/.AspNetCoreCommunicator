import { AuthAction, AuthActionType, LoginSuccessAction } from '../actions/auth';

export interface AuthState {
	isLoggingIn: boolean;
	isUserLoggedIn: boolean;
	token: string;
}
const initialState: AuthState = {
	isLoggingIn: false,
	isUserLoggedIn: !!sessionStorage.getItem('token'),
	token: sessionStorage.getItem('token'),
};

export function authStateReduceer(state = initialState, action: AuthAction): AuthState {
	switch (action.type) {
		case AuthActionType.Login:
			return {
				...state,
				isLoggingIn: true,
			};
		case AuthActionType.LoginSuccess:
			return {
				...state,
				isLoggingIn: false,
				token: (action as LoginSuccessAction).payload.token,
				isUserLoggedIn: true,
			};
		case AuthActionType.LoginFailure:
			return {
				...state,
				isLoggingIn: false,
			};

		case AuthActionType.Logout:
			return {
				...state,
				isUserLoggedIn: false,
				token: null,
			};
		default:
			return {
				...state,
			};
	}
}
