export enum SignalingEvent {
	JoinRoom = 'JoinRoom',
	LeaveRoom = 'LeaveRoom',
	Answer = 'Answer',
	UserAdded = 'User.Added',
	UserRemoved = 'User.Removed',
	UserLoggedIn = 'User.Logged.In',
	Offer = 'Offer',
	OfferProposed = 'Offer.Proposed',
	AnswerProposed = 'Answer.Proposed',
	GetConnectionId = 'GetConnectionId',
	Candidate = 'Candidate',
	CandidateProposed = 'Candidate.Proposed',
}
