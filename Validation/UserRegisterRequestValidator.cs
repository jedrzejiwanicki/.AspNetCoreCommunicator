using System;
using Communicator.Dtos;
using Communicator.Requests;
using Communicator.Services;
using FluentValidation;
using FluentValidation.Results;

namespace Communicator.Validation
{
    public class UserRegisterRequestValidator : AbstractValidator<UserRegistrationRequest>
    {
        public UserRegisterRequestValidator(UserService _userService)
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name is required.");

            RuleFor(x => x.Name)
                .MustAsync(async (name, cancel) => await _userService.GetByName(name) == null)
                .WithMessage("User name must be unique");

            RuleFor(x => x.Password)
                .MinimumLength(8)
                .WithMessage("Password must be at least 8 characters");
        }
    }
}