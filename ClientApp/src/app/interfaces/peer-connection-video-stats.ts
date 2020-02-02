export interface PeerConnectionVideoStats {
	id: string;
	timestamp: number;
	type: string;
	trackIdentifier: string;
	kind: string;
	width: number;
	height: number;
	framesPerSecond: number;
}
