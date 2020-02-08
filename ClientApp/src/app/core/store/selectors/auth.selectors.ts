import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, first } from 'rxjs/operators';

import { AppState } from '@store/reducers';

export const selectAuthToken = (store: Store<AppState>): Observable<string> =>
	store.select((state) => state.auth.token).pipe(filter((token) => !!token));

export const selectAuthTokenDistinct = (store: Store<AppState>): Observable<string> =>
	selectAuthToken(store).pipe(distinctUntilChanged((t1, t2) => t1 === t2));

export const selectAuthUserLoggedIn = (store: Store<AppState>): Observable<boolean> =>
	store.select((state) => state.auth.isUserLoggedIn);

export const selectAuthUserLoggedInIfTrue = (store: Store<AppState>): Observable<boolean> =>
	selectAuthUserLoggedIn(store).pipe(filter((isUserLoggedIn) => !!isUserLoggedIn));

export const selectAuthTokenAsPromise = (store: Store<AppState>): Promise<string> =>
	selectAuthToken(store)
		.pipe(first())
		.toPromise();
