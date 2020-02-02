using MediatR;

namespace Communicator.Notifications
{
    public class SignalingOnConnectedNotification : INotification
    {
        public string Token { get; set; }
        public string ConnectionId { get; set; }
    }
}