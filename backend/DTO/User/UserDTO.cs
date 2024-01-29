using backend.Models;

namespace backend.DTO.User
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public required List<Stat> Stats { get; set; }
    }
}
