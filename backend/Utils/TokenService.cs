using backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Utils
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.Username),
            new Claim("role", user.Role.ToString()),
        };

            var Sectoken = new JwtSecurityToken(_config["Jwt:ValidIssuer"],
              _config["Jwt:ValidAudience"],
              claims,
              expires: DateTime.Now.AddMinutes(45),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(Sectoken);
        }
    }
}
