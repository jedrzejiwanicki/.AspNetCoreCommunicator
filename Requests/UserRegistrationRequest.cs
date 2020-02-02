using Communicator.Db.Entities;
using Communicator.Dtos;

namespace Communicator.Requests
{
    public class UserRegistrationRequest : ValidatedRequest<User>
    {
        public string Name { get; set; }
        public string Password { get; set; }

        public UserRegistrationRequest(UserRegistrationRequestPayload payload)
        {
            Name = payload.Name;
            Password = payload.Password;
        }
    }
}