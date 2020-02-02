import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UserStreamService {
	private userStream: BehaviorSubject<MediaStream> = new BehaviorSubject<MediaStream>(null);

	public requestStream(): Observable<MediaStream> {
		return new Observable<MediaStream>((observer) => {
			console.log('Requesting media!')
			navigator.getUserMedia(
				{ audio: { noiseSuppression: true, echoCancellation: true }, video: { width: 1280, height: 720, frameRate: 30 }},
				(myStream) => {
					this.userStream.next(myStream);
					observer.next(myStream);
				},
				function(error) {
					console.warn(error);
				}
			);
		});
	}

	public getUserStream(): Observable<MediaStream> {
		return this.userStream.pipe(filter((stream) => !!stream));
	}

	public disableAudioStream(): void {
		this.userStream.value.getAudioTracks().forEach((track) => (track.enabled = false));
	}

	public disableVideoStream(): void {
		this.userStream.value.getVideoTracks().forEach((track) => (track.enabled = false));
	}
}
