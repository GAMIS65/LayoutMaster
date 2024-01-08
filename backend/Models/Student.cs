using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Student : User
    {
        [Required]
        public Guid GroupId { get; set; }
    }
}
