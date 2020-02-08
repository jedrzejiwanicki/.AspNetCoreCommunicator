using System.Data;
using Communicator.Db.Entities;
using Communicator.Requests;
using Communicator.Services;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace Communicator.Validation
{
    public class JoinRoomRequestValidator: AbstractValidator<JoinRoomRequest>
    {

        public JoinRoomRequestValidator(RoomService _roomService, UserManager<User> _userManager)
        {
            RuleFor(x => x.RoomName)
                .NotEmpty()
                .WithMessage("Room name is required.")
                .MustAsync(async (name, cancel) => await _roomService.ExistsByName(name))
                .WithMessage("Room does not exist");
            

            RuleFor(x => x.UserId)
                .NotEmpty()
                .WithMessage("User Id is required.")
                .MustAsync(async (id, cancel) => await _userManager.FindByIdAsync(id) != null)
                .WithMessage("User does not exist.");
        }
    }
}