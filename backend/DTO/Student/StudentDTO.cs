using backend.DTO.User;

namespace backend.DTO.Student
{
    public class StudentDTO : UserDTO
    {
        public Guid GroupdId { get; set; }
    }
}
