import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanDeactivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RoomPageComponent } from '@features/room-page/components/room-page/room-page.component';
import { SignalingService } from '@services/signaling.service';

@Injectable()
export class RoomLeaveGuard implements CanDeactivate<RoomPageComponent> {
	constructor(private signalingService: SignalingService) {}
	canDeactivate(
		component: RoomPageComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		this.signalingService.leave();
		return true;
	}
}
