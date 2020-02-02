import { Room } from './room';
import { User } from './user';

export class RoomDetails extends Room {
	id: string;
	name: string;
	connectedUsers: User[];
}
