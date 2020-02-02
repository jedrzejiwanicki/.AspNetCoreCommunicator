import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpRoomService } from '../http/http-room.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ExistingRoomGuard implements CanActivate {
	constructor(private httpRoomService: HttpRoomService, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.httpRoomService.isRoomExisting(next.params.name).pipe(
			tap((isExisting) => {
				if (!isExisting) {
					this.router.navigateByUrl('/rooms/not-found');
				}
			})
		);
	}
}
