using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Mistake
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
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
        public char MistakeKey { get; set; }

        [Required]
        public int MistakeCount { get; set; }

        public Guid MistakeId { get; set; }

        public Mistake Mistake { get; set; }
    }
}
