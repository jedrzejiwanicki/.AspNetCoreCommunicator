using Communicator.Db.Entities;
using MediatR;

namespace Communicator.Requests
{
    public class MeRequest : IRequest<User>
    {
        public string Authorization { get; set; }
    }
}