using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Constants;
using Communicator.Db.Extensions;
using Communicator.Hubs;
using Communicator.Requests;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Communicator.Handlers
{
    public class SignalingSendMessageNotificationHandler: INotificationHandler<SignalingSendMessageNotification>
    {
        private readonly RoomService _roomService;
        private readonly UserService _userService;
        private readonly IHubContext<SignalingHub> _context;

        public SignalingSendMessageNotificationHandler(RoomService _roomService, UserService _userService, IHubContext<SignalingHub> _context)
        {
            this._roomService = _roomService;
            this._userService = _userService;
            this._context = _context;
        }
        public async Task Handle(SignalingSendMessageNotification notification, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByToken(notification.Token);
            var room = await _roomService.GetById(notification.RoomId);
            var message = await _roomService.AddMessageToRoom(room, user, notification.Message);

            await _context.Clients.Group(room.Name).SendAsync(SignalingEvent.MessageAdded, message.MapTo().SimpleResponse());
        }
    }
}