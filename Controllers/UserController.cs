using System;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Dtos;

using Communicator.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Communicator.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly IMediator _mediator;

        public UserController(IMediator _mediator)
        {
            this._mediator = _mediator;
        }

        [HttpPost]
        public Task<User> Index([FromBody] UserRegistrationRequestPayload user)
        {
            return this._mediator.Send(new UserRegistrationRequest(user));
        }


        [Authorize]
        [HttpGet]
        [Route("me")]
        public Task<User> Me([FromHeader] Headers headers)
        {
            return this._mediator.Send(new MeRequest() {Authorization = headers.Authorization});
        }
    }
}