using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Requests;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class JoinRoomRequestHandler: IRequestHandler<JoinRoomRequest, Room>
    {
        private readonly UserService _userService;
        private readonly RoomService _roomService;

        public JoinRoomRequestHandler(UserService _userService, RoomService _roomService)
        {
            this._userService = _userService;
            this._roomService = _roomService;
        }
        public async Task<Room> Handle(JoinRoomRequest request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetById(request.UserId);
            var room = await _roomService.GetByName(request.RoomName);
            

            _roomService.AddUserToRoom(user, room);

            return await _roomService.GetById(room.Id);

        }
    }
}