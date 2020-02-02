using Communicator.Requests;
using Communicator.Services;
using FluentValidation;

namespace Communicator.Validation
{
    public class GetRoomDetailsRequestValidator: AbstractValidator<GetRoomDetailsRequest>
    {
        public GetRoomDetailsRequestValidator(RoomService _roomService)
        {
            RuleFor(x => x.Name)
                .MustAsync(async (name, cancel) => await _roomService.ExistsByName(name))
                .WithMessage("Room does not exist.");
        }
    }
}