using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [ForeignKey("Teacher")]
        public Guid TeacherId { get; set; }
        public required string InviteCode { get; set; }
        public List<Student> Students { get; set; } = new List<Student>();
    }
}
