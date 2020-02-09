using System.Collections.Generic;

namespace Communicator.Dtos
{
    public class SimpleRoomResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<SimpleUserResponse> ConnectedUsers { get; set; }
        public List<SimpleMessageResponse> Messages { get; set; }
    }
    
}