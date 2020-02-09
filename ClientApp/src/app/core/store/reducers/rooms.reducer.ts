import { Room, RoomDetails } from '../../../models';
import { FetchAllRoomsSuccess, RoomAction, RoomActionType } from '../actions/rooms';

export interface RoomsState {
	rooms: Room[];
	roomDetails: RoomDetails;
	isLoading: boolean;
	isLoadingDetails: boolean;
}

export const initialState: RoomsState = {
	rooms: [],
	roomDetails: null,
	isLoading: false,
	isLoadingDetails: false,
};

export function roomsReducer(state = initialState, action: RoomAction) {
	switch (action.type) {
		case RoomActionType.FetchAllSuccess:
			return {
				...state,
				rooms: action.payload,
				isLoading: false,
			};
		case RoomActionType.FetchAll:
			return {
				...state,
				isLoading: true,
			};
		case RoomActionType.FetchAllFailure:
			return {
				...state,
				isLoading: false,
			};

		case RoomActionType.FetchRoomDetails:
			return {
				...state,
				isLoadingDetails: true,
			};

		case RoomActionType.FetchRoomDetailsSuccess:
			return {
				...state,
				roomDetails: action.payload,
				isLoadingDetails: false,
			};

		case RoomActionType.FetchRoomDetailsFailure:
			return {
				...state,
				isLoadingDetails: false,
			};

		case RoomActionType.AddMessage:
			return {
				...state,
				roomDetails: {
					...state.roomDetails,
					messages: [...state.roomDetails.messages, action.payload],
				},
			};
		default:
			return {
				...state,
			};
	}
}
