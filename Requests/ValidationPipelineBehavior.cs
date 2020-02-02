using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace Communicator.Requests
{
    public class ValidationPipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : ValidatedRequest<TResponse>
    {
        private readonly IValidator<TRequest> _validator;

        public ValidationPipelineBehavior(IValidator<TRequest> _validator)
        {
            this._validator = _validator;
        }
        async public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            
            var res = this._validator.Validate(request);
            
            if (!res.IsValid)
            {
               throw new ValidationException(res.Errors);
            }
            
            
            return await next();
        }
    }
}