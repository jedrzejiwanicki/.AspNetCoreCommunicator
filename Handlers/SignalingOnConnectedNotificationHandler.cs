using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Notifications;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class SignalingOnConnectedNotificationHandler : INotificationHandler<SignalingOnConnectedNotification>
    {
        private readonly UserService _userService;

        public SignalingOnConnectedNotificationHandler(UserService _userService)
        {
            this._userService = _userService;
        }

        public async Task Handle(SignalingOnConnectedNotification notification, CancellationToken cancellationToken)
        {
            await _userService.UpdateUserConnection(notification.Token, notification.ConnectionId);
        }
    }
}