using Microsoft.AspNetCore.Builder;

namespace Communicator.Middlewares
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseValidationErrorMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidationErrorMiddleware>();
        }

        public static IApplicationBuilder UseEnsureUserExistMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<EnsureUserExistsMiddleware>();
        }
    }
}