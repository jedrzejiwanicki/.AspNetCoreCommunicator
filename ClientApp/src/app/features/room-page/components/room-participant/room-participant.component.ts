import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PeerConnection } from '@models/peer-connection';

@Component({
	selector: 'cm-room-participant',
	templateUrl: './room-participant.component.html',
	styleUrls: ['./room-participant.component.scss'],
})
export class RoomParticipantComponent implements OnInit {
	@Input() connection: PeerConnection;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.connection.volume.subscribe(() => this.cdr.detectChanges());
	}
}
