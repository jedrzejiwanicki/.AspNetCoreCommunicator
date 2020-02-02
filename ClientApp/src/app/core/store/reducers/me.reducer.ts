import { User } from '@models/user';
import { MeAction, MeActionType } from '@store/actions/me';

export interface MeState {
	user: User;
	isLoading: boolean;
}

export const initialState: MeState = {
	user: null as User,
	isLoading: false,
};

export function meReducer(state = initialState, action: MeAction): MeState {
	switch (action.type) {
		case MeActionType.MeRequest:
			return {
				...state,
				isLoading: true,
			};

		case MeActionType.MeRequestSuccess:
			return {
				...state,
				user: action.payload as User,
				isLoading: false,
			};

		case MeActionType.MeRequestFailure:
			return {
				...state,
				isLoading: false,
			};
		default:
			return {
				...state,
			};
	}
}
