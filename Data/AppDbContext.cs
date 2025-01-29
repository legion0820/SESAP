using Microsoft.EntityFrameworkCore;
using CapstoneController.Models;
namespace CapstoneController.Data{
    public class AppDbContext : DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

        }

        public DbSet<Command> Commands => Set<Command>();
    }
}