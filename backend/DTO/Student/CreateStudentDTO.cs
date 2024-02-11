using backend.DTO.User;

namespace backend.DTO.Student
{
    public class CreateStudentDTO : CreateUserDTO
    {
        public string GroupName { get; set; }
        public string GroupCode { get; set; }
    }
}
