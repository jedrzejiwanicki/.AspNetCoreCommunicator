using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Communicator.Configurations;
using Communicator.Db.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Communicator.Helpers
{
    public class JwtBuilder
    {
        public static string CreateUserToken(User user, AppConfigurations appConfigurations)
        {
            var handler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                Issuer = appConfigurations.Get("Authentication:ValidIssuer"),
                Audience = appConfigurations.Get("Authentication:ValidAudience"),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials =
                    new SigningCredentials(
                        new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(appConfigurations.Get("Authentication:Secret"))),
                        SecurityAlgorithms.HmacSha512Signature),
            };

            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }
    }
}