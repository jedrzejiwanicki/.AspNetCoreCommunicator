using Communicator.Db.Entities;
using Communicator.Dtos;
using MediatR;

namespace Communicator.Notifications
{
    public class SignalingCandidateNotification : INotification
    {
        public SignalingCandidateNotification(ISignalingCandidatePayload payload)
        {
            Sender = payload.Sender;
            Receiver = payload.Receiver;
            Candidate = payload.Candidate;
        }

        public object Candidate { get; set; }
        public User Sender { get; set; }
        public User Receiver { get; set; }
    }
}