using backend.DTO.User;

namespace backend.DTO.Student
{
    public class CreateStudentDTO : CreateUserDTO
    {
        public string GroupCode { get; set; }
    }
}
