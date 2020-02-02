using Communicator.Db.Entities;
using MediatR;

namespace Communicator.Requests
{
    public class GetRoomDetailsRequest : ValidatedRequest<Room>
    {
        public string Name { get; set; }
    }
}