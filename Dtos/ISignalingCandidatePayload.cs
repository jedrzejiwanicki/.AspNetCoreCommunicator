using Communicator.Db.Entities;

namespace Communicator.Dtos
{
    public class ISignalingCandidatePayload
    {
        public object Candidate { get; set; }
        public User Receiver { get; set; }
        public User Sender { get; set; }
    }
}