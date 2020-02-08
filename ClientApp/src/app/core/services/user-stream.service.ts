import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UserStreamService {
	public isAudioStreamDisabled = false;
	public isVideoStreamDisabled = false;
	public isScreenSharingModeEnabled = false;

	private userStream: BehaviorSubject<MediaStream> = new BehaviorSubject<MediaStream>(null);

	public requestStream(): Promise<void> {
		return new Promise((resolve, reject) => {
			navigator.getUserMedia(
				{
					audio: { noiseSuppression: true, echoCancellation: true },
					video: { width: 1280, height: 720, frameRate: 30 },
				},
				(myStream) => {
					this.userStream.next(myStream);
					resolve();
				},
				function(error) {
					console.warn(error);
					reject();
				}
			);
		});
	}

	public requestScreenSharing(): Promise<void> {
		return (navigator.mediaDevices as any)
			.getDisplayMedia({ audio: true, video: true })
			.then((stream) => {
				this.userStream.next(stream);

				stream.getVideoTracks()[0].onended = () => this.requestStream();
			});
	}

	public toggleScreenSharing(): void {
		if (this.isScreenSharingModeEnabled) {
			this.requestStream().then(() => {
				this.isScreenSharingModeEnabled = !this.isScreenSharingModeEnabled;
			});
		} else {
			this.requestScreenSharing().then(() => {
				this.isScreenSharingModeEnabled = !this.isScreenSharingModeEnabled;
			});
		}
	}

	public getUserStream(): Observable<MediaStream> {
		return this.userStream.asObservable().pipe(filter((stream) => !!stream));
	}

	public disableAudioStream(): void {
		this.userStream.value.getAudioTracks().forEach((track) => (track.enabled = false));
	}

	public toggleAudioStream(): void {
		if (this.isAudioStreamDisabled) {
			this.enableAudioStream();
		} else {
			this.disableAudioStream();
		}

		this.isAudioStreamDisabled = !this.isAudioStreamDisabled;
	}

	public toggleVideoStream(): void {
		if (this.isVideoStreamDisabled) {
			this.enableVideoStream();
		} else {
			this.disableVideoStream();
		}

		this.isVideoStreamDisabled = !this.isVideoStreamDisabled;
	}

	public enableAudioStream(): void {
		this.userStream.value.getAudioTracks().forEach((track) => (track.enabled = true));
	}

	public disableVideoStream(): void {
		this.userStream.value.getVideoTracks().forEach((track) => (track.enabled = false));
	}

	public enableVideoStream(): void {
		this.userStream.value.getVideoTracks().forEach((track) => (track.enabled = true));
	}
}
