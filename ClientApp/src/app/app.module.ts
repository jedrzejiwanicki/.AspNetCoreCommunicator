import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './core/store/effects';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UnauthorizedIntercetor } from './core/interceptors/unauthorized.interceptor';
import { PERSISTENT_AUTH_PROVIDER } from '@core/providers/persistent-auth-provider';
import { MainNavModule } from '@shared/components';
import { AppComponent } from './app.component';
import { SIGNAL_R_MANAGER_PROVIDER } from './core/providers/signal-r-manager-provider';
import { routes } from './app.routes';
import { ToastsModule } from '@shared/components/toasts/toasts.module';
import { ErrorHandlerInterceptor } from '@interceptors/error-handler.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		NgbModule,
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(routes),
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		EffectsModule.forRoot(effects),
		MainNavModule,
		ToastsModule,
	],
	providers: [
		SIGNAL_R_MANAGER_PROVIDER,
		PERSISTENT_AUTH_PROVIDER,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: UnauthorizedIntercetor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
