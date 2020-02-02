using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Requests;
using Communicator.Services;
using MediatR;

namespace Communicator.Handlers
{
    public class MeRequestHandler: IRequestHandler<MeRequest, User>
    {
        private readonly UserService _userService;

        public MeRequestHandler(UserService _userService)
        {
            this._userService = _userService;
        }
        public Task<User> Handle(MeRequest request, CancellationToken cancellationToken)
        {
            return _userService.GetByToken(request.Authorization);
        }
    }
}