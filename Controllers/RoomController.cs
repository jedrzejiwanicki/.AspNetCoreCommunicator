using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Db.Extensions;
using Communicator.Dtos;
using Communicator.Requests;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Communicator.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomController : Controller
    {
        private readonly RoomService _roomService;
        private readonly UserService _userService;
        private readonly IMediator _mediator;

        public RoomController(RoomService _roomService, UserService _userService, IMediator _mediator)
        {
            this._roomService = _roomService;
            this._userService = _userService;
            this._mediator = _mediator;
        }

        [HttpGet]
        [Authorize]
        public List<SimpleRoomResponse> Get()
        {
            return _roomService.GetAll().Select(r => r.MapTo().SimpleResponse()).ToList();
        }

        [HttpGet("details/{name}")]
        [Authorize]
        public Task<SimpleRoomResponse> GetDetails(string name)
        {
            return this._mediator.Send(new GetRoomDetailsRequest() {Name = name});
        }


        [HttpGet("exists/{name}")]
        [Authorize]
        public async Task<IActionResult> IsExisting(string name)
        {
            var exists = await _roomService.ExistsByName(name);

            return Ok(exists);
        }

        [HttpPost("join")]
        [Authorize]
        public Task Join([FromBody] JoinRoomRequestPayload payload)
        {
            return Task.FromResult(_mediator.Send(new JoinRoomRequest(payload)));
        }
    }
}