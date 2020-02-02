export interface PeerConnectionAudioStats {
	id: string;
	timestamp: number;
	type: string;
	trackIdentifier: string;
	kind: string;
	audioLevel: number;
	totalAudioEnergy: number;
	totalSamplesDuration: number;
}
