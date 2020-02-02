using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Constants;
using Communicator.Db.Entities;
using Communicator.Hubs;
using Communicator.Notifications;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Communicator.Handlers
{
    public class SignalingOnDisconnectedNotificationHandler: INotificationHandler<SignalingOnDisconnectedNotification>
    {
        private readonly RoomService _roomService;
        private readonly UserService _userService;
        private readonly IHubContext<SignalingHub> _hubContext;

        public SignalingOnDisconnectedNotificationHandler(RoomService _roomService, UserService _userService, IHubContext<SignalingHub> _hubContext)
        {
            this._roomService = _roomService;
            this._userService = _userService;
            this._hubContext = _hubContext;
        }
        public async Task Handle(SignalingOnDisconnectedNotification notification, CancellationToken cancellationToken)
        {
            
            var user = await _userService.GetByToken(notification.Token);
            var room = await _roomService.GetById(user.ConnectedRoomId);
            
            if (room != null)
            {
                await _roomService.RemoveUserFromRoom(user, room);
                await _hubContext.Clients.Group(room.Name).SendAsync(SignalingEvent.UserRemoved, user.Id);
            }
   
        }
    }
}