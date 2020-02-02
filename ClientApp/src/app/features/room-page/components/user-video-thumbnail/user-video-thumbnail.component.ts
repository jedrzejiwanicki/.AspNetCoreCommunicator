import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UserStreamService } from '@services/user-stream.service';

@Component({
	selector: 'cm-user-video-thumbnail',
	templateUrl: './user-video-thumbnail.component.html',
	styleUrls: ['./user-video-thumbnail.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class UserVideoThumbnailComponent implements OnInit {
	@Output() muted: EventEmitter<void> = new EventEmitter<void>();

	constructor(public userStreamService: UserStreamService) {}

	ngOnInit() {}

	disableAudioStream() {
		this.userStreamService.disableAudioStream();
		this.muted.emit()
	}

	disableVideoStream() {
		this.userStreamService.disableVideoStream();
		this.muted.emit()

	}
}
