using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Extensions;
using Communicator.Dtos;
using Communicator.Requests;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class JoinRoomRequestHandler : IRequestHandler<JoinRoomRequest, SimpleRoomResponse>
    {
        private readonly UserService _userService;
        private readonly RoomService _roomService;

        public JoinRoomRequestHandler(UserService _userService, RoomService _roomService)
        {
            this._userService = _userService;
            this._roomService = _roomService;
        }

        public async Task<SimpleRoomResponse> Handle(JoinRoomRequest request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetById(request.UserId);
            var room = await _roomService.GetByName(request.RoomName);


            await _roomService.AddUserToRoom(user, room);

            return (await _roomService.GetById(room.Id)).MapTo().SimpleResponse();
        }
    }
}