using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Communicator.Helpers
{
    public class JwtDecoder
    {
        public static string GetUserIdFromToken(string token)
        {
            return GetClaimValueFromToken(token, "nameid");
        }

        public static string GetClaimValueFromToken(string token, string claim)
        {
            return (new JwtSecurityTokenHandler().ReadToken(token) as JwtSecurityToken).Claims
                .First(_claim => _claim.Type == claim).Value;
        }
    }
}