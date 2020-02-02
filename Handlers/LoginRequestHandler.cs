using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Communicator.Dtos;
using Communicator.Helpers;
using Communicator.Requests;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Communicator.Handlers
{
    public class LoginRequestHandler : IRequestHandler<LoginRequest, LoginRequestResponse>
    {
        private readonly UserService _userService;
        private readonly IConfiguration _configuration;

        public LoginRequestHandler(UserService _userService, IConfiguration _configuration)
        {
            this._userService = _userService;

            this._configuration = _configuration;
        }

        public async Task<LoginRequestResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByName(request.UserName);
            var token = JwtBuilder.CreateUserToken(user, _configuration);

            return new LoginRequestResponse() {Token = token};
        }
    }
}