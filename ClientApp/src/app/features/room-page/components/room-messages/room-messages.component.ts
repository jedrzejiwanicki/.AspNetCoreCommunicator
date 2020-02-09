import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { SignalingService } from '@services/signaling.service';
import { Subscription } from 'rxjs';
import { selectRoomDetails, selectRoomMessages } from '@store/selectors/rooms.selectors';
import { RoomDetails } from '@models/room-details';
import { DomSanitizer } from '@angular/platform-browser';
import { AddMessageAction } from '@store/actions/rooms';
import { Message } from '@models/message';

@Component({
	selector: 'cm-room-messages',
	templateUrl: './room-messages.component.html',
	styleUrls: ['./room-messages.component.scss'],
})
export class RoomMessagesComponent implements OnInit {
	private subscriptions: Subscription[] = [];
	private details: RoomDetails;

	public message: string;
	public messages: Message[];

	@ViewChild('scrollElement', { static: false }) scrollElement: ElementRef;
	constructor(
		private store: Store<AppState>,
		private signalingService: SignalingService,
		private domSanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this.listenForNewMessage();

		this.subscriptions.push(
			selectRoomDetails(this.store).subscribe(
				(details: RoomDetails) => (this.details = details)
			),
			selectRoomMessages(this.store).subscribe((messages) => {
				this.messages = messages;

				setTimeout(() => {
					this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight;
				}, 0);
			})
		);
	}

	private listenForNewMessage(): void {
		this.subscriptions.push(
			this.signalingService
				.onMessageAdded()
				.subscribe((mes) => this.store.dispatch(new AddMessageAction(mes)))
		);
	}

	public sendMessage(): void {
		this.signalingService.message({
			roomId: this.details.id,
			message: this.domSanitizer.sanitize(SecurityContext.HTML, this.message),
		});

		this.message = '';
	}
}
