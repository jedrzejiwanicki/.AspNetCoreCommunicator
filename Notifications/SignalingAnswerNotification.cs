using Communicator.Db.Entities;
using Communicator.Dtos;
using MediatR;

namespace Communicator.Notifications
{
    public class SignalingAnswerNotification : INotification
    {
        public SignalingAnswerNotification(ISignalingAnswerPayload payload)
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