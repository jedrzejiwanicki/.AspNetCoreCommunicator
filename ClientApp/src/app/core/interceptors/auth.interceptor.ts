import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private store: Store<AppState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = sessionStorage.getItem('token');

		if (token) {
			return next.handle(
				req.clone({
					setHeaders: {
						Authorization: `Bearer ${token}`,
					},
				})
			);
		} else {
			return next.handle(req);
		}
	}
}
