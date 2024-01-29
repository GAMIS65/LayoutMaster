using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTO.Student;
using backend.DTO.Teacher;
using backend.DTO.User;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TeachersController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherDTO>>> GetTeachers()
        {
            var teachers = await _context.Teachers
            .Select(teacher => new TeacherDTO
            {
                Id = teacher.Id,
                Username = teacher.Username,
                CreatedAt = teacher.CreatedAt,
                Stats = teacher.Stats,
                Groups = teacher.Groups,
            })
            .ToListAsync();
            return Ok(teachers);
        }

        // GET: api/Teachers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherDTO>> GetTeacher(Guid id)
        {
            if (_context.Teachers == null)
            {
                return NotFound();
            }
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            var t = new TeacherDTO()
            {
                Id = teacher.Id,
                Username = teacher.Username,
                CreatedAt = teacher.CreatedAt,
                Stats = teacher.Stats
            };

            return Ok(t);
        }

        // POST: api/Teachers
        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher(CreateUserDTO teacher)
        {
            var existingUser = await _context.Teachers.FirstOrDefaultAsync(t => t.Username == teacher.Username || t.Email == teacher.Email);

            if (existingUser != null)
            {
                return BadRequest("User with this username or email already exists");
            }

            var t = new Teacher()
            {
                Id = Guid.NewGuid(),
                Username = teacher.Username,
                Email = teacher.Email,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(teacher.Password, 13),
                Role = Role.Teacher,
                CreatedAt = DateTime.Now.ToUniversalTime(),
                Stats = { },
                Groups = { },
            };

            _context.Teachers.Add(t);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/Teachers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(Guid id)
        {
            if (_context.Teachers == null)
            {
                return NotFound();
            }
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
