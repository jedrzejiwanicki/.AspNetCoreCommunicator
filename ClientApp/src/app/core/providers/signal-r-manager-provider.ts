import { APP_BOOTSTRAP_LISTENER, Provider } from '@angular/core';

import { SignalRManager } from '../services/signal-r-manager.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAuthTokenDistinct } from '@store/selectors/auth.selectors';

export const SIGNAL_R_MANAGER_PROVIDER: Provider = {
	provide: APP_BOOTSTRAP_LISTENER,
	useFactory: (signalRManager: SignalRManager, store: Store<AppState>) => {
		selectAuthTokenDistinct(store).subscribe(() => {
			signalRManager.init();
		});

		return () => {};
	},
	multi: true,
	deps: [SignalRManager, Store],
};
