import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { LogoutAction } from '@store/actions/auth';

@Injectable()
export class UnauthorizedIntercetor implements HttpInterceptor {
	constructor(private router: Router, private store: Store<AppState>) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpEvent<any>) => {
				if (((error as any) as HttpErrorResponse).status === 401) {
					this.store.dispatch(new LogoutAction());
					this.router.navigateByUrl('/auth/login');
				}

				throw error;
			})
		);
	}
}
