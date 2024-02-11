using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTO.User;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using backend.Utils;
using backend.Migrations;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private IConfiguration _config;

        public UsersController(DatabaseContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
        }

        // GET: api/Users/5
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetUser()
        {
            var userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var stats = await _context.Stats.Where(u => u.UserId == userId).ToListAsync();

            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users
                         .Include(u => u.Stats)
                         .ThenInclude(s => s.Mistakes)
                         .ThenInclude(s => s.MistakeDetails)
                         .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            var u = new UserDTO()
            {
                Id = user.Id,
                Username = user.Username,
                CreatedAt = user.CreatedAt,
                Stats = user.Stats
            };

            return Ok(u);
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] CreateUserDTO user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username || u.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest(new { statusText = "User with this username or email already exists" });
            }


            if (!Enum.TryParse(user.Role, out Models.Role role))
            {
                return BadRequest(new { statusText = "Invalid role" });
            }

            var u = new User()
            {
                Id = Guid.NewGuid(),
                Username = user.Username,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, 13),
                Role = role,
                CreatedAt = DateTime.Now.ToUniversalTime(),
                Stats = { }
            };

            _context.Users.Add(u);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser == null)
            {
                return BadRequest(new { statusText = "Invalid credentials" });
            }

            if (!BCrypt.Net.BCrypt.EnhancedVerify(user.Password, existingUser.Password))
            {
                return BadRequest(new { statusText = "Invalid credentials" });
            }

            var TokenService = new TokenService(_config);
            var token = TokenService.GenerateToken(existingUser);
            return Ok(new { token = token });
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser()
        {
            var userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (_context.Users == null)
            {
                return NotFound();
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
