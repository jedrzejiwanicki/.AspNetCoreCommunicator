import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Observable } from 'rxjs';
import { RoomDetails } from '@models/room-details';
import { filter, map } from 'rxjs/operators';

export const selectRoomDetails = (store: Store<AppState>): Observable<RoomDetails> => {
	return store.select((state) => state.rooms.roomDetails);
};

export const selectRoomDetailsIfExists = (store: Store<AppState>) =>
	selectRoomDetails(store).pipe(filter((r) => !!r));

export const selectRoomMessages = (store: Store<AppState>) =>
	selectRoomDetailsIfExists(store).pipe(map((room) => room.messages));
