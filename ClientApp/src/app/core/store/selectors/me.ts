import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MeState } from '@store/reducers/me.reducer';
import { User } from '@models/user';

export const selectMe = (store: Store<AppState>): Observable<MeState> =>
	store.select((state) => state.me);

export const selectMeUser = (store: Store<AppState>): Observable<User> =>
	store.select((state) => state.me.user).pipe(filter((u) => !!u));

export const selectMeUserId = (store: Store<AppState>): Observable<string> =>
	selectMeUser(store).pipe(map((user) => user.id));
