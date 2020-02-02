import { User } from '@models/user';
import { Action } from '@ngrx/store';

export enum MeActionType {
	MeRequest = '[Me] Get User Data',
	MeRequestSuccess = '[Me] Get User Data Success',
	MeRequestFailure = '[Me] Get User Data Failure',
}

export class MeRequestAction implements Action {
	readonly type: MeActionType = MeActionType.MeRequest;
	readonly payload = {};
}

export class MeSuccessAction implements Action {
	readonly type: MeActionType = MeActionType.MeRequestSuccess;

	constructor(public payload: User) {}
}

export class MeFailureAction implements Action {
	readonly type: MeActionType = MeActionType.MeRequestFailure;
	readonly payload = {};
}

export type MeAction = MeRequestAction | MeSuccessAction | MeFailureAction;
