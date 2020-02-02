using System;
using System.Threading.Tasks;
using Communicator.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace Communicator.Middlewares
{
    public class EnsureUserExistsMiddleware : IMiddleware
    {
        private readonly UserService _userService;

        public EnsureUserExistsMiddleware(UserService _userService)
        {
            this._userService = _userService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var authorizationHeader = context.Request.Headers["authorization"];
            
            if (StringValues.IsNullOrEmpty(authorizationHeader))
            {
                await next(context);
            }
            else
            {
                var user = await _userService.GetByToken(authorizationHeader.ToString().Replace("Bearer ", ""));

                if (user == null)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Stale token");
                }
                else
                {
                    await next(context);
                }
            }
        }
    }
}