using Communicator.Db.Entities;
using Communicator.Dtos;
using MediatR;

namespace Communicator.Notifications
{
    public class SignalingOfferNotification : INotification
    {
        public SignalingOfferNotification(ISignalingOfferPayload payload)
        {
            Type = payload.Type;
            Receiver = payload.Receiver;
            Sender = payload.Sender;
            Sdp = payload.Sdp;
        }

        public string Type { get; set; }
        public User Receiver { get; set; }
        public User Sender { get; set; }
        public string Sdp { get; set; }
    }
}