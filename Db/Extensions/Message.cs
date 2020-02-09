using Communicator.Helpers.Mappers;

namespace Communicator.Db.Extensions
{
    public static class MessageExtension
    {
        public static MessageMappingFactory MapTo(this Entities.Message message)
        {
            return new MessageMappingFactory(message);
        }
    }
}