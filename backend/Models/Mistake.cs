using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Mistake
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        [ForeignKey("Stat")]
        public Guid StatId { get; set; }
        public List<MistakeValue> MistakeDetails { get; set; } = new List<MistakeValue>();
    }

    public class MistakeValue
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Mistake")]
        public Guid MistakeId { get; set; }

        [Required]
        public char MistakeKey { get; set; }

        [Required]
        public int MistakeCount { get; set; }
    }
}
