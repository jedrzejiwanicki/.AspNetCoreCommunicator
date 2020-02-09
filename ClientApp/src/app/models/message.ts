import { User } from '@models/user';
import { Room } from '@models/room';

export class Message {
	public id: string;
	public createdAt: string;
	public modifiedAt: string;
	public author: User;
	public room: Room;
	public message: string;
}
