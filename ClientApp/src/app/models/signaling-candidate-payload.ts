import { User } from './user';

export class SignalingCandidatePayload {
	public candidate: RTCIceCandidate;
	public receiver: User;
	public sender: User;

	constructor(candidate: RTCIceCandidate, receiver: User, sender: User) {
		this.candidate = candidate;
		this.receiver = receiver;
		this.sender = sender;
	}
}
