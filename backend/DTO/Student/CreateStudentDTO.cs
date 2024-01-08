using backend.DTO.User;

namespace backend.DTO.Student
{
    public class CreateStudentDTO : CreateUserDTO
    {
        public Guid GroupId { get; set; }
    }
}
