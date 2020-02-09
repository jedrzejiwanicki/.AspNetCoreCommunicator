using System.Linq;
using Communicator.Db.Entities;
using Communicator.Db.Extensions;
using Communicator.Dtos;

namespace Communicator.Helpers.Mappers
{
    public class RoomMappingFactory
    {
        private readonly Room _room;

        public RoomMappingFactory(Room room)
        {
            _room = room;
        }

        public SimpleRoomResponse SimpleResponse()
        {
            return new SimpleRoomResponse()
            {
                Id = _room.Id,
                Name = _room.Name,
                ConnectedUsers = _room.ConnectedUsers.Select(u => u.MapTo().SimpleResponse()).ToList(),
                Messages = _room.Messages.Select(m => m.MapTo().SimpleResponse()).OrderBy((m) => m.CreatedAt).ToList()
            };
        }
    }
}