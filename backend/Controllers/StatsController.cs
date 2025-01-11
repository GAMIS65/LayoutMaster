using backend.Data;
using backend.DTO.Score;
using backend.DTO.User;
using backend.Migrations;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using NuGet.Protocol;
using System.Runtime.ConstrainedExecution;
using System.Security.Claims;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public StatsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostStatsDTO stat)
        {
            Guid id = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var existingStat = await _context.Stats
                .Include(s => s.Mistakes)
                .FirstOrDefaultAsync(s => s.UserId == id && s.LayoutName == stat.LayoutName);

            List<MistakeValue> Mistakes = new List<MistakeValue>();
            Guid newStatId = new Guid();
            Mistake mistake = new Mistake() { StatId = existingStat != null ? existingStat.Id : newStatId, Id = new Guid(), UserId = id, MistakeDetails = Mistakes };

            foreach (var mistakeValue in stat.MistakeValues)
            {
                Mistakes.Add(new MistakeValue() { Id = new Guid(), MistakeKey = mistakeValue.Key, MistakeCount = mistakeValue.Value, MistakeId = mistake.Id });
            }

            if (existingStat != null)
            {
                if (existingStat.Mistakes.Count > 20)
                {
                    var mistakesToDelete = _context.Mistakes.Take(stat.MistakeValues.Count);
                    _context.Mistakes.RemoveRange(mistakesToDelete);
                }
                existingStat.CharactersTyped += 10;
                existingStat.Mistakes.Add(mistake);
                _context.Stats.Update(existingStat);
            }
            else
            {
                var s = new Stat()
                {
                    Id = newStatId,
                    UserId = id,
                    LayoutName = stat.LayoutName,
                    CharactersTyped = 10,
                    Mistakes = new List<Mistake> { mistake },
                };
                _context.Stats.Add(s);
            }

            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<GetStatsDTO>> GetStats(string layoutName)
        {
            Guid id = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var stats = await _context.Stats
                .Include(s => s.Mistakes)
                .ThenInclude(s => s.MistakeDetails)
                .FirstOrDefaultAsync(s => s.LayoutName == layoutName && s.UserId == id);

            if (stats == null)
            {
                return NotFound("You don't have any stats for this layout");
            }

            List<MistakeValueDTO> mistakes = new List<MistakeValueDTO>();

            foreach (var mistake in stats.Mistakes)
            {
                foreach (var mistakeDetail in mistake.MistakeDetails)
                {
                    MistakeValueDTO values = new MistakeValueDTO();
                    values.Value = new KeyValuePair<char, int>(mistakeDetail.MistakeKey, mistakeDetail.MistakeCount);

                    mistakes.Add(values);
                }
            }

            var s = new GetStatsDTO()
            {
                LayoutName = stats.LayoutName,
                CharactersTyped = stats.CharactersTyped,
                MistakeValues = mistakes
            };

            return Ok(s);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<GetStatsDTO>> GetUserStats(string layoutName, Guid userId)
        {
            Guid id = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (userId != id)
            {
                Unauthorized();
            }

            var stats = await _context.Stats
                .Include(s => s.Mistakes)
                .ThenInclude(s => s.MistakeDetails)
                .FirstOrDefaultAsync(s => s.LayoutName == layoutName && s.UserId == userId);

            if (stats == null)
            {
                return NotFound("You don't have any stats for this layout");
            }

            List<MistakeValueDTO> mistakes = new List<MistakeValueDTO>();

            foreach (var mistake in stats.Mistakes)
            {
                foreach (var mistakeDetail in mistake.MistakeDetails)
                {
                    MistakeValueDTO values = new MistakeValueDTO();
                    values.Value = new KeyValuePair<char, int>(mistakeDetail.MistakeKey, mistakeDetail.MistakeCount);

                    mistakes.Add(values);
                }
            }

            var s = new GetStatsDTO()
            {
                LayoutName = stats.LayoutName,
                CharactersTyped = stats.CharactersTyped,
                MistakeValues = mistakes
            };

            return Ok(s);
        }
    }
}
