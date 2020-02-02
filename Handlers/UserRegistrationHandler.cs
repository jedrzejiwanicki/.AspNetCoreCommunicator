using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Requests;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class UserRegistrationHandler : IRequestHandler<UserRegistrationRequest, User>
    {
        private readonly UserService _userService;

        public UserRegistrationHandler(UserService _userService)
        {
            this._userService = _userService;
        }

        public Task<User> Handle(UserRegistrationRequest request, CancellationToken cancellationToken)
        {
            return _userService.Create(request);
        }
    }
}