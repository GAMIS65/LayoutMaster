using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTO.User;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using backend.Utils;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private IConfiguration _config;
        public UsersController(IConfiguration config, IUserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetUser()
        {
            var userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var userDto = new UserDTO()
            {
                Id = user.Id,
                Username = user.Username,
                CreatedAt = user.CreatedAt,
                Stats = user.Stats
            };
            return Ok(userDto);
        }
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] CreateUserDTO user)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(user.Email);
            if (existingUser != null)
            {
                return BadRequest(new { statusText = "User with this email already exists" });
            }
            try
            {
                UserValidation.ValidateUser(user.Username, user.Email, user.Password, user.Role);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { statusText = ex.Message });
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
            await _userRepository.AddUserAsync(u);
            return Ok();
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO user)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(user.Email);
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
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            await _userRepository.DeleteUserAsync(userId);
            return Ok();
        }

        [HttpPost]
        [Route("test")]
        public ActionResult Test([FromBody] TestDTO data)
        {
            return Ok(data);
        }
    }

    public class TestDTO
    {
        public string Value { get; set; }
    }
}