import { Room } from './room';
import { User } from './user';
import { Message } from '@models/message';

export class RoomDetails extends Room {
	public id: string;
	public name: string;
	public connectedUsers: User[];
	public messages: Message[];

}
