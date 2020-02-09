using Communicator.Db.Entities;
using Communicator.Helpers.Mappers;

namespace Communicator.Db.Extensions
{
    public static class RoomExtension
    {
        public static RoomMappingFactory MapTo(this Room room)
        {
            return new RoomMappingFactory(room);
        }
    }
}