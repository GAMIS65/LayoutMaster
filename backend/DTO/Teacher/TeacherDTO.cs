using backend.DTO.User;
using backend.Models;

namespace backend.DTO.Teacher
{
    public class TeacherDTO : UserDTO
    {
        public List<Group> Groups { get; set; } = new List<Group>();
    }
}
