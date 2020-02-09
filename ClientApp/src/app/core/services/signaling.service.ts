import { Injectable } from '@angular/core';

import { SignalRManager } from './signal-r-manager.service';
import { HubConnection } from '@aspnet/signalr';
import { SignalingLoginPayload, SignalingOfferPayload, User } from '../../models';
import { Observable } from 'rxjs';
import { SignalingEvent } from '../../enums/signaling-event';
import { SignalingCandidatePayload } from '../../models/signaling-candidate-payload';
import { SignalingSendMessagePayload } from '@dtos/SignalingSendMessagePayload';
import { Message } from '@models/message';

@Injectable({
	providedIn: 'root',
})
export class SignalingService {
	constructor(private signalRManager: SignalRManager) {}

	join(userId: string, roomName: string): void {
		this.invoke<SignalingLoginPayload>(
			SignalingEvent.JoinRoom,
			new SignalingLoginPayload(userId, roomName)
		);
	}

	leave(): void {
		this.invoke<void>(SignalingEvent.LeaveRoom);
	}

	message(payload: SignalingSendMessagePayload): void {
		this.invoke<SignalingSendMessagePayload>(SignalingEvent.SendMessage, payload);
	}

	offer(offer: RTCSessionDescriptionInit, receiver: User, sender: User): void {
		this.invoke<SignalingOfferPayload>(
			SignalingEvent.Offer,
			new SignalingOfferPayload(offer, receiver, sender)
		);
	}

	answer(offer: RTCSessionDescriptionInit, receiver: User, sender: User): void {
		this.invoke<SignalingOfferPayload>(
			SignalingEvent.Answer,
			new SignalingOfferPayload(offer, receiver, sender)
		);
	}

	cadidate(candidate: RTCIceCandidate, receiver: User, sender: User): void {
		this.invoke<SignalingCandidatePayload>(
			SignalingEvent.Candidate,
			new SignalingCandidatePayload(candidate, receiver, sender)
		);
	}

	onMessageAdded(): Observable<Message> {
		return this.on<Message>(SignalingEvent.MessageAdded);
	}

	onCandidateReceived(): Observable<SignalingCandidatePayload> {
		return this.on<SignalingCandidatePayload>(SignalingEvent.CandidateProposed);
	}

	onUserLogged(): Observable<User> {
		return this.on<User>(SignalingEvent.UserLoggedIn);
	}

	onUserAdded(): Observable<User> {
		return this.on<User>(SignalingEvent.UserAdded);
	}

	onUserRemoved(): Observable<string> {
		return this.on<string>(SignalingEvent.UserRemoved);
	}
	onUserOffer(): Observable<SignalingOfferPayload> {
		return this.on<SignalingOfferPayload>(SignalingEvent.OfferProposed);
	}

	onUserAnswer(): Observable<SignalingOfferPayload> {
		return this.on<SignalingOfferPayload>(SignalingEvent.AnswerProposed);
	}

	private on<T = any>(event: SignalingEvent): Observable<T> {
		return new Observable<any>((observer) => {
			this.signalRManager.onConnectionStarted().subscribe((connection) => {
				connection.on(event, (data: T) => observer.next(data));
			});
		});
	}

	private invoke<T = any>(event: SignalingEvent, payload?: T): void {
		this.signalRManager.onConnectionStarted().subscribe((connection: HubConnection) => {
			payload ? connection.invoke(event, payload) : connection.invoke(event);
		});
	}
}
