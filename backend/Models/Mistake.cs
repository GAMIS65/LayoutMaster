using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Mistake
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [Required]
        public required string LayoutName { get; set; }

        public required ICollection<MistakeDetail> MistakeDetails { get; set; }
    }

    public class MistakeDetail
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("Mistake")]
        public Guid MistakeId { get; set; }

        [Required]
        public char MistakeKey { get; set; }

        [Required]
        public int MistakeCount { get; set; }

        public Mistake? Mistake { get; set; }
    }
}
