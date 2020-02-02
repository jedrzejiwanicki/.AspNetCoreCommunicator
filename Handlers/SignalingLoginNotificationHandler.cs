using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Constants;
using Communicator.Db.Entities;
using Communicator.Db.Extensions;
using Communicator.Hubs;
using Communicator.Notifications;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Communicator.Handlers
{
    public class SignalingLoginHandler : INotificationHandler<SignalingLoginNotification>
    {
        private readonly IHubContext<SignalingHub> _signalingHub;
        private readonly UserService _userService;
        private readonly RoomService _roomService;

        public SignalingLoginHandler(IHubContext<SignalingHub> _signalingHub, UserService _userService, RoomService _roomService)
        {
            this._signalingHub = _signalingHub;
            this._userService = _userService;
            this._roomService = _roomService;
        }

        public async Task Handle(SignalingLoginNotification request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetById(request.UserId);
            var room = await _roomService.GetByName(request.RoomName);

            await _roomService.AddUserToRoom(user, room);
            await _signalingHub.Groups.AddToGroupAsync(user.Connection.ConnectionId, room.Name);
            
            await _signalingHub.Clients.Client(user.Connection.ConnectionId)
                .SendAsync(SignalingEvent.UserLoggedIn, user.MapTo().SimpleResponse());
            
            await _signalingHub.Clients.GroupExcept(room.Name, user.Connection.ConnectionId)
                .SendAsync(SignalingEvent.UserAdded, user.MapTo().SimpleResponse());
        }
    }
}