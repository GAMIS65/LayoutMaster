using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Student : User
    {
        [Required]
        [ForeignKey("Group")]
        public Guid GroupId { get; set; }
        [Required]
        [ForeignKey("User")]
        public Guid TeacherId { get; set; }
    }
}
