import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserStreamService } from '@services/user-stream.service';

@Component({
	selector: 'cm-user-video-thumbnail',
	templateUrl: './user-video-thumbnail.component.html',
	styleUrls: ['./user-video-thumbnail.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class UserVideoThumbnailComponent implements OnInit {
	constructor(public userStreamService: UserStreamService) {}

	ngOnInit() {}

	toggleAudioStream() {
		this.userStreamService.toggleAudioStream();
	}

	toggleVideoStream() {
		this.userStreamService.toggleVideoStream();
	}

	toggleScreenSharing() {
		this.userStreamService.toggleScreenSharing();
	}
}
