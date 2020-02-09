import { Component, Input, OnInit } from '@angular/core';
import { PeerConnection } from '@models/peer-connection';

@Component({
	selector: 'cm-room-participants-continer',
	templateUrl: './room-participants-continer.component.html',
	styleUrls: ['./room-participants-continer.component.scss'],
})
export class RoomParticipantsContinerComponent {
	@Input() participants: PeerConnection[];

	public isShrink = false;

	toggleShrink(): void {
		this.isShrink = !this.isShrink;
	}
}
