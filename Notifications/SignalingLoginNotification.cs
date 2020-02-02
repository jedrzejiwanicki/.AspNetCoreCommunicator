using Communicator.Dtos;
using MediatR;

namespace Communicator.Notifications
{
    public class SignalingLoginNotification : INotification
    {
        public SignalingLoginNotification(ISignalingLoginPayload payload)
        {
            RoomName = payload.RoomName;
            UserId = payload.UserId;
        }

        public string RoomName { get; set; }
        public string UserId { get; set; }
    }
}