using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Constants;
using Communicator.Hubs;
using Communicator.Notifications;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Communicator.Handlers
{
    public class SignalingOfferNotificationHandler : INotificationHandler<SignalingOfferNotification>
    {
        private readonly IHubContext<SignalingHub> _signalingHub;
        private readonly UserService _userService;

        public SignalingOfferNotificationHandler(IHubContext<SignalingHub> _signalingHub, UserService _userService)
        {
            this._signalingHub = _signalingHub;
            this._userService = _userService;
        }

        public async Task Handle(SignalingOfferNotification notification, CancellationToken cancellationToken)
        {
            var requestedUser = await _userService.GetById(notification.Receiver.Id);


            await _signalingHub.Clients.Client(requestedUser.Connection.ConnectionId)
                .SendAsync(SignalingEvent.OfferProposed, notification);
        }
    }
}