using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Communicator.Db.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Communicator.Helpers
{
    public class JwtBuilder
    {
        public static string CreateUserToken(User user, IConfiguration _configuration)
        {
            var handler = new JwtSecurityTokenHandler();
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName)

                }),
                Issuer = _configuration.GetValue<string>("Authentication:ValidIssuer"),
                Audience = _configuration.GetValue<string>("Authentication:ValidAudience"),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Authentication:Secret"))), SecurityAlgorithms.HmacSha512Signature),
            };

            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }
    }
}