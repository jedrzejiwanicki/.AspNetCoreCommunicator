using Communicator.Db.Entities;
using Communicator.Dtos;
using MediatR;

namespace Communicator.Requests
{
    public class GetRoomDetailsRequest : ValidatedRequest<SimpleRoomResponse>
    {
        public string Name { get; set; }
    }
}