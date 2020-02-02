import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { MeActionType, MeFailureAction, MeSuccessAction } from '@store/actions/me';
import { HttpUserService } from '@http/http-user.service';
import { User } from '@models/user';

@Injectable()
export class MeEffects {
	constructor(private actions$: Actions, private httpUserService: HttpUserService) {}

	@Effect()
	$me = this.actions$.pipe(
		ofType(MeActionType.MeRequest),
		switchMap(() =>
			this.httpUserService.me().pipe(
				map((me: User) => new MeSuccessAction(me)),
				catchError(() => of(new MeFailureAction()))
			)
		)
	);
}
