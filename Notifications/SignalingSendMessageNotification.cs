using MediatR;

namespace Communicator.Requests
{
    public class SignalingSendMessageNotification : INotification
    {
        public string Token { get; set; }
        public string Message { get; set; }
        public string RoomId { get; set; }
    }
}