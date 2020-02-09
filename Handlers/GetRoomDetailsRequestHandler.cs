using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Db.Extensions;
using Communicator.Dtos;
using Communicator.Requests;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class GetRoomDetailsRequestHandler : IRequestHandler<GetRoomDetailsRequest, SimpleRoomResponse>
    {
        private readonly RoomService _roomService;

        public GetRoomDetailsRequestHandler(RoomService _roomService)
        {
            this._roomService = _roomService;
        }

        public async Task<SimpleRoomResponse> Handle(GetRoomDetailsRequest request, CancellationToken cancellationToken)
        {
            return (await _roomService.GetByName(request.Name)).MapTo().SimpleResponse();
        }
    }
}