using Communicator.Db.Entities;
using Communicator.Dtos;

namespace Communicator.Helpers.Mappers
{
    public class UserMappingFactory
    {
        private readonly User _user;
        
        public UserMappingFactory(User user)
        {
            _user = user;
        }

        public SimpleUserResponse SimpleResponse()
        {
            return new SimpleUserResponse() {UserName = _user.UserName, Id = _user.Id};
        }
    }
}