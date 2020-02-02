using Communicator.Db.Entities;

namespace Communicator.Dtos
{
    public class ISignalingOfferPayload
    {
        public string Type { get; set; }
        public string Sdp { get; set; }
        public User Receiver { get; set; }
        public User Sender { get; set; }
    }
}