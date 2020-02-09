using System;

namespace Communicator.Dtos
{
    public class SimpleMessageResponse
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set;  }
        public DateTime ModifiedAt { get; set; }
        public SimpleUserResponse Author { get; set; }
        public string Message { get; set; }
        public string RoomId { get; set; }
    }
}