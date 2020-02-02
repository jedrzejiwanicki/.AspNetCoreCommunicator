import { APP_BOOTSTRAP_LISTENER, Provider } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { filter, take } from 'rxjs/operators';
import { MeRequestAction } from '@store/actions/me';

export const PERSISTENT_AUTH_PROVIDER: Provider = {
	provide: APP_BOOTSTRAP_LISTENER,
	useFactory: (store: Store<AppState>) => {
		store
			.select((state) => state.auth.token)
			.pipe(
				filter((token) => !!token),
				take(1)
			)
			.subscribe(() => store.dispatch(new MeRequestAction()));
		return () => {};
	},
	multi: true,
	deps: [Store],
};
