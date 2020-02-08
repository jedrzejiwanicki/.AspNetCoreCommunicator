import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService, ToastType } from '@services/toast.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private toast: ToastService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error && error.error && Array.isArray(error.error)) {
					for (const err of error.error) {
						this.toast.add({
							header: 'Error',
							type: ToastType.Danger,
							text: (err as any).ErrorMessage,
							timeout: 6000,
						});
					}
				}
				throw error;
			})
		);
	}
}
