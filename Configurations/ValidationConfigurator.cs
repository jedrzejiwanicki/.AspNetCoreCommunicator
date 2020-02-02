
using Communicator.Requests;
using Communicator.Validation;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace Communicator.Configurations
{
    public static class ValidationConfigurator
    {
        public static void SetupFluentValidation(this IServiceCollection services)
        { 
            services.AddControllers().AddFluentValidation();
            
            services.AddTransient<IValidator<UserRegistrationRequest>, UserRegisterRequestValidator>();
            services.AddTransient<IValidator<JoinRoomRequest>, JoinRoomRequestValidator>();
            services.AddTransient<IValidator<LoginRequest>, LoginRequestValidator>();
            services.AddTransient<IValidator<GetRoomDetailsRequest>, GetRoomDetailsRequestValidator>();
        }
    }
}