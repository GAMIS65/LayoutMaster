using backend.DTO.Student;

namespace backend.DTO.Groups
{
    public class GroupDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<GroupStudentDTO> Students { get; set; } = new List<GroupStudentDTO>();
    }
}
