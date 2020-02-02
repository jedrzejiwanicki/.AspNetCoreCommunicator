import { APP_BOOTSTRAP_LISTENER, Provider } from '@angular/core';

import { SignalRManager } from '../services/signal-r-manager.service';

export const SIGNAL_R_MANAGER_PROVIDER: Provider = {
	provide: APP_BOOTSTRAP_LISTENER,
	useFactory: (signalRManager: SignalRManager) => {
		signalRManager.init();

		return () => {};
	},
	multi: true,
	deps: [SignalRManager],
};
