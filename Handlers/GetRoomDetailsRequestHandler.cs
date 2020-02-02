using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Requests;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class GetRoomDetailsRequestHandler: IRequestHandler<GetRoomDetailsRequest, Room>
    {
        private readonly RoomService _roomService;

        public GetRoomDetailsRequestHandler(RoomService _roomService)
        {
            this._roomService = _roomService;
        }
        
        public Task<Room> Handle(GetRoomDetailsRequest request, CancellationToken cancellationToken)
        {
            return _roomService.GetByName(request.Name);
        }
    }
}