using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Stat
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public required string LayoutName { get; set; }
        public int CharactersTyped { get; set; }
        public List<Mistake> Mistakes { get; set; } = new List<Mistake>();
    }
}
