using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(32)]
        [MinLength(3)]
        public required string Username { get; set; }
        [Required]
        [MaxLength(255)]
        public required string Email { get; set; }
        [Required]
        [MaxLength(64)]
        [MinLength(8)]
        public required string Password { get; set; }
        [Required]
        public required Role Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Stat> Stats { get; set; } = new List<Stat>();
    }
}
