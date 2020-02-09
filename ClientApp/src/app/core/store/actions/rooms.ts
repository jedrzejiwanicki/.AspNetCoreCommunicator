import { Action } from '@ngrx/store';
import { Room, RoomDetails } from '../../../models';
import { JoinRoomRequestDTO } from '@dtos/JoinRoomRequestDTO';
import { Message } from '@models/message';

export enum RoomActionType {
	FetchAll = '[Rooms] Fetch All Request',
	FetchAllSuccess = '[Rooms] Fetch All Success',
	FetchAllFailure = '[Rooms] Fetch All Failure',
	FetchRoomDetails = '[Rooms] Fetch Room Details Request',
	FetchRoomDetailsFailure = '[Rooms] Fetch Room Details Failure',
	FetchRoomDetailsSuccess = '[Rooms] Fetch Room Details Success',
	JoinRoom = '[Rooms] Join',
	JoinRoomSuccess = '[Rooms] Join Success',
	JoinRoomFailure = '[Rooms] Join Failure',
	AddMessage = '[Rooms] Add Message',
}

export class JoinRoomAction implements Action {
	public readonly type = RoomActionType.JoinRoom;
	constructor(public payload: JoinRoomRequestDTO) {}
}
export class JoinRoomSuccessAction implements Action {
	public readonly type = RoomActionType.JoinRoomSuccess;
}
export class JoinRoomFailureAction implements Action {
	public readonly type = RoomActionType.JoinRoomFailure;
}

export class FetchAllRoomsAction implements Action {
	public readonly type = RoomActionType.FetchAll;
	public payload = {};
}

export class FetchAllRoomsSuccess implements Action {
	public readonly type = RoomActionType.FetchAllSuccess;

	constructor(public payload: Room[]) {}
}

export class FetchAllRoomsFailure implements Action {
	public readonly type = RoomActionType.FetchAllFailure;
	public payload = {};
}

export class FetchRoomDetailsAction implements Action {
	public readonly type = RoomActionType.FetchRoomDetails;

	constructor(public payload: string) {}
}

export class FetchRoomDetailsSuccessAction implements Action {
	public readonly type = RoomActionType.FetchRoomDetailsSuccess;

	constructor(public payload: RoomDetails) {}
}

export class FetchRoomDetailsFailureAction implements Action {
	public readonly type = RoomActionType.FetchRoomDetailsFailure;
	public payload = {};
}

export class AddMessageAction implements Action {
	public readonly type = RoomActionType.AddMessage;

	constructor(public payload: Message) {}
}
export type RoomAction =
	| FetchAllRoomsAction
	| FetchAllRoomsSuccess
	| FetchAllRoomsFailure
	| FetchRoomDetailsAction
	| FetchRoomDetailsSuccessAction
	| FetchRoomDetailsFailureAction
	| AddMessageAction;
