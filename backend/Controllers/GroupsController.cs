using backend.Data;
using backend.DTO.Groups;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public GroupsController(DatabaseContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Teacher")]
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDTO>> GetGroup(Guid id)
        {
            var userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var group = await _context.Groups.FirstOrDefaultAsync(g => g.Id == id && g.TeacherId == userId);

            if (group == null)
            {
                return NotFound("Group with this id doesn't exist");
            }
            var students = await _context.Students
                .Where(s => s.GroupId == group.Id)
                .Select(student => new GroupStudentDTO()
                {
                    Id = student.Id,
                    Username = student.Username,
                }).ToListAsync();

            var g = new GroupDTO()
            {
                Id = group.Id,
                Name = group.Name,
                Students = students,
            };

            return Ok(g);
        }

        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public async Task<ActionResult<List<GroupsDTO>>> GetGroups()
        {
            var userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var groups = await _context.Groups
                .Where(g => g.TeacherId == userId)
                .Select(group => new GroupsDTO()
                {
                    Id = group.Id,
                    Name = group.Name,
                }).ToListAsync();

            if (groups == null)
            {
                return NotFound();
            }

            return Ok(groups);
        }
            

        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public async Task<ActionResult> CreateGroup(CreateGroupDTO Group)
        { 
            Guid id = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var existingGroup = await _context.Groups.FirstOrDefaultAsync(g => g.TeacherId == id && g.Name == Group.Name);

            if (existingGroup != null)
            {
                return BadRequest("Group with this name already exists");
            }

            var group = new Group()
            {
                Id = new Guid(),
                Name = Group.Name,
                TeacherId = id,
                InviteCode = Group.InviteCode,
                Students = { }
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
