using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Stat> Stats { get; set; }
        public DbSet<Mistake> Mistakes { get; set; }
        public DbSet<Group> Groups { get; set; }    
    }
}