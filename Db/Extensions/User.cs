using System;
using Communicator.Dtos;
using Communicator.Helpers.Mappers;

namespace Communicator.Db.Extensions
{
    public static class UserExtension
    {
        public static UserMappingFactory MapTo(this Entities.User user)
        {
            return new UserMappingFactory(user);
        }
    }
}