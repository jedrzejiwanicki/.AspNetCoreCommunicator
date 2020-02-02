import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PeerConnectionAudioStats } from '../interfaces/peer-connection-audio-stats';
import { PeerConnectionVideoStats } from '../interfaces/peer-connection-video-stats';

export class PeerConnectionMediaStream {
	private peerConnectionAudioStats: BehaviorSubject<
		PeerConnectionAudioStats
	> = new BehaviorSubject<PeerConnectionAudioStats>({} as PeerConnectionAudioStats);
	private peerConnectionVideoStats: BehaviorSubject<
		PeerConnectionVideoStats
	> = new BehaviorSubject<PeerConnectionVideoStats>({} as PeerConnectionVideoStats);


	public getPeerConnectionAudioStats(): Observable<PeerConnectionAudioStats> {
		return this.peerConnectionAudioStats.pipe(filter((x) => !!x));
	}

	public getPeerConnectionVideoStats(): Observable<PeerConnectionVideoStats> {
		return this.peerConnectionVideoStats.pipe(filter((x) => !!x));
	}

	public init(pc: RTCPeerConnection): void {
		setInterval(() => {
			pc.getStats().then((stats: RTCStatsReport) => this.runStatsFactory(stats));
		}, 1000);
	}

	private runStatsFactory(stats: RTCStatsReport) {
		stats.forEach((stat) => {

			if (stat.type === 'media-source' && stat.kind === 'video') {
				this.peerConnectionVideoStats.next(stat as PeerConnectionVideoStats);
			}

			if (stat.type === 'media-source' && stat.kind === 'audio') {
				this.peerConnectionAudioStats.next(stat as PeerConnectionAudioStats);
			}
		});
	}
}
