import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { HttpRoomService } from '../../http/http-room.service';
import {
	FetchAllRoomsAction,
	FetchAllRoomsFailure,
	FetchAllRoomsSuccess,
	FetchRoomDetailsAction,
	FetchRoomDetailsSuccessAction,
	RoomActionType,
} from '../actions/rooms';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Room } from '../../../models';
import { of } from 'rxjs';

@Injectable()
export class RoomsEffects {
	constructor(private actions$: Actions, private httpRoomService: HttpRoomService) {}

	@Effect()
	$fetchAllRooms = this.actions$.pipe(
		ofType(RoomActionType.FetchAll),
		switchMap((action: FetchAllRoomsAction) => {
			return this.httpRoomService.getAllRooms().pipe(
				map((response: Room[]) => new FetchAllRoomsSuccess(response)),
				catchError((err) => of(new FetchAllRoomsFailure()))
			);
		})
	);

	@Effect()
	$fetchRoomDetails = this.actions$.pipe(
		ofType(RoomActionType.FetchRoomDetails),
		switchMap((action: FetchRoomDetailsAction) =>
			this.httpRoomService.getRoomDetails(action.payload).pipe(
				map((response) => new FetchRoomDetailsSuccessAction(response)),
				catchError(() => of(new FetchAllRoomsFailure()))
			)
		)
	);
}
