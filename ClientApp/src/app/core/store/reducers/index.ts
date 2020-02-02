import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
	MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { AuthState, authStateReduceer } from './auth.reducer';
import { roomsReducer, RoomsState } from './rooms.reducer';
import { meReducer, MeState } from '@store/reducers/me.reducer';

export interface AppState {
	auth: AuthState;
	rooms: RoomsState;
	me: MeState;
}

export const reducers: ActionReducerMap<AppState> = {
	auth: authStateReduceer,
	rooms: roomsReducer,
	me: meReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
