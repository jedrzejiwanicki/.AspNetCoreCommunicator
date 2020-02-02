using System;
using System.Reflection;
using Communicator.Db.Entities;
using Communicator.Dtos;
using Communicator.Requests;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Communicator.Configurations
{
    public static class MediatorConfigurator
    {
        public static void SetupMediator(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddTransient(typeof(IPipelineBehavior<JoinRoomRequest, Room>), typeof(ValidationPipelineBehavior<JoinRoomRequest, Room>));
            services.AddTransient(typeof(IPipelineBehavior<UserRegistrationRequest, User>), typeof(ValidationPipelineBehavior<UserRegistrationRequest, User>));
            services.AddTransient(typeof(IPipelineBehavior<LoginRequest, LoginRequestResponse>), typeof(ValidationPipelineBehavior<LoginRequest, LoginRequestResponse>));
            services.AddTransient(typeof(IPipelineBehavior<GetRoomDetailsRequest, Room>), typeof(ValidationPipelineBehavior<GetRoomDetailsRequest, Room>));
        }
    }
}