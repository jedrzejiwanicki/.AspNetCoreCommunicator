using System.Threading.Tasks;
using Communicator.Dtos;
using Communicator.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Communicator.Controllers
{
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {
        private readonly IMediator _mediator;

        public AuthenticationController(IMediator _mediator)
        {
            this._mediator = _mediator;
        }

        [Route("login")]
        [HttpPost]
        public async Task<LoginRequestResponse> Login([FromBody] LoginRequestPayload payload)
        {
            return await _mediator.Send(new LoginRequest() {UserName = payload.UserName, Password = payload.Password});
        }
    }
}