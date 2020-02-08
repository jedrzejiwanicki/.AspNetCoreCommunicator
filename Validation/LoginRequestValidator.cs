using Communicator.Db.Entities;
using Communicator.Requests;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace Communicator.Validation
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator(UserManager<User> _userManager)
        {
            RuleFor(x => x.Password)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .WithMessage("You must provide password.");

            RuleFor(x => x.UserName)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .WithMessage("You must provide username.");


            RuleFor(x => x)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .MustAsync(async (payload, cancel) =>
                    await _userManager.CheckPasswordAsync(await _userManager.FindByNameAsync(payload.UserName),
                        payload.Password))
                .WithMessage("Incorrect credentials.")
                .MustAsync(async (payload, cancel) => await _userManager.FindByNameAsync(payload.UserName) != null)
                .WithMessage("Incorrect credentials.");
        }
    }
}