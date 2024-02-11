using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTO.Student;
using backend.DTO.User;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public StudentsController(DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/Students
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(CreateStudentDTO student)
        {
            var existingUser = await _context.Students.FirstOrDefaultAsync(s => s.Username == student.Username || s.Email == student.Email);

            if (existingUser != null)
            {
                return BadRequest("User with this username or email already exists");
            }

            var group = await _context.Groups.FirstOrDefaultAsync(g => g.Name == student.GroupName && g.InviteCode == student.GroupCode);

            if (group == null) 
            {
                return BadRequest("Invalid invite code");
            }

            var s = new Student()
            {
                Id = Guid.NewGuid(),
                Username = student.Username,
                Email = student.Email,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(student.Password, 13),
                Role = Role.Student,
                CreatedAt = DateTime.Now.ToUniversalTime(),
                Stats = { },
                TeacherId = group.TeacherId,
                GroupId = group.Id,
            };

            _context.Students.Add(s);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
