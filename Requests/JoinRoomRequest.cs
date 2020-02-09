using Communicator.Db.Entities;
using Communicator.Dtos;


namespace Communicator.Requests
{
    public class JoinRoomRequest : ValidatedRequest<SimpleRoomResponse>
    {
        public string UserId { get; set; }
        public string RoomName { get; set; }

        public JoinRoomRequest(JoinRoomRequestPayload payload)
        {
            UserId = payload.UserId;
            RoomName = payload.RoomName;
        }
    }
}