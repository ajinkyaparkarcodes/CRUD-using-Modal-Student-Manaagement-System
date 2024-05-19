using CRUD_With_Modal.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_With_Modal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) : base(options)
        {
            
        }
        public DbSet<Student> students { get; set; }
    }
}
