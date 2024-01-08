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
        public required string InviteCode { get; set; }
        public List<Student> Students { get; set; } = new List<Student>();
    }
}
