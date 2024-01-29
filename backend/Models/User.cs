using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        public required Role Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Stat> Stats { get; set; } = new List<Stat>();
    }
}
