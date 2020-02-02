using Communicator.Dtos;
using MediatR;

namespace Communicator.Requests
{
    public class LoginRequest : ValidatedRequest<LoginRequestResponse>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}