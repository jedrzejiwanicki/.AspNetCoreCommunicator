import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'cm-video-thumbnail',
	templateUrl: './video-thumbnail.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./video-thumbnail.component.scss'],
})
export class VideoThumbnailComponent {
	@Input() public stream: MediaStream;

	public isLoading = true;

	public onLoadedData(): void {
		this.isLoading = false;
	}
}
