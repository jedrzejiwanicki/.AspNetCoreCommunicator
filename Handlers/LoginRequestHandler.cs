using System;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Configurations;
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
        private readonly AppConfigurations _appConfigurations;


        public LoginRequestHandler(UserService _userService, AppConfigurations appConfigurations)
        {
            this._userService = _userService;
            _appConfigurations = appConfigurations;
        }

        public async Task<LoginRequestResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetByName(request.UserName);
            var token = JwtBuilder.CreateUserToken(user, _appConfigurations);

            return new LoginRequestResponse() {Token = token};
        }
    }
}