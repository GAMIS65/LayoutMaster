namespace backend.Models
{
    public class Teacher : User
    {
        public List<Group> Groups { get; set; } = new List<Group>();
    }
}
