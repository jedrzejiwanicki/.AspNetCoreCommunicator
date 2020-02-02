using MediatR;

namespace Communicator.Notifications
{
    public class SignalingOnDisconnectedNotification: INotification
    {
        public string Token { get; set; }
        public string ConnectionId { get; set; }
    }
}