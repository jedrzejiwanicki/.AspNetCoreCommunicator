import { User } from './user';

export class SignalingOfferPayload {
	public type: RTCSdpType;
	public sdp: string;
	public receiver: User;
	public sender: User;

	constructor(offer: RTCSessionDescriptionInit, receiver: User, sender: User) {
		this.type = offer.type;
		this.sdp = offer.sdp;
		this.receiver = receiver;
		this.sender = sender;
	}
}
