using Communicator.Db.Entities;
using Communicator.Db.Extensions;
using Communicator.Dtos;

namespace Communicator.Helpers.Mappers
{
    public class MessageMappingFactory
    {
        private readonly Message _message;

        public MessageMappingFactory(Message message)
        {
            _message = message;
        }

        public SimpleMessageResponse SimpleResponse()
        {
            return new SimpleMessageResponse()
            {
                Id = _message.Id,
                CreatedAt = _message.CreatedAt,
                ModifiedAt = _message.ModifiedAt,
                Author = _message.Author.MapTo().SimpleResponse(),
                RoomId = _message.Room.Id,
                Message = _message.Text
            };
        }
    }
}