using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Group
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public Guid TeacherId { get; set; }
        // TODO: Add a join code
        public List<Student> Students { get; set; } = new List<Student>();
    }
}
