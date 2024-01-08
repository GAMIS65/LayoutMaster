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

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDTO>>> GetStudents()
        {
            var students = await _context.Students
            .Select(student => new StudentDTO
            {
                Id = student.Id,
                Username = student.Username,
                CreatedAt = student.CreatedAt,
                Mistakes = student.Mistakes,
                GroupdId = student.GroupId
            })
            .ToListAsync();
            return Ok(students);
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDTO>> GetStudent(Guid id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            var s = new StudentDTO()
            {
                Id = Guid.NewGuid(),
                Username = student.Username,
                CreatedAt = DateTime.Now.ToUniversalTime(),
                Mistakes = { }
            };

            return Ok(s);
        }

        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult> PostStudent(CreateStudentDTO student)
        {
            var existingUser = await _context.Students.FirstOrDefaultAsync(s => s.Username == student.Username || s.Email == student.Email);

            if (existingUser != null)
            {
                return BadRequest("User with this username or email already exists");
            }

            var s = new Student()
            {
                Id = Guid.NewGuid(),
                Username = student.Username,
                Email = student.Email,
                Password = BCrypt.Net.BCrypt.EnhancedHashPassword(student.Password, 13),
                CreatedAt = DateTime.Now.ToUniversalTime(),
                Mistakes = { },
                GroupId = student.GroupId,
            };

            _context.Students.Add(s);
            await _context.SaveChangesAsync();
            return Ok();
        }
        public async Task<IActionResult> DeleteStudent(Guid id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }

            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
