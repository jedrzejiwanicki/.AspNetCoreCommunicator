using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Communicator.Db.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Communicator.Db
{
    public class CommunicatorContext : IdentityDbContext<User>
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public override DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }

        public DbSet<UserConnection> UserConnections { get; set; }

        public CommunicatorContext(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
            
            base.OnConfiguring(optionsBuilder);

            if (_env.IsProduction())
            {
                optionsBuilder.UseMySql(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
            }
            else
            {
                optionsBuilder.UseMySql(_configuration.GetValue<string>("ConnectionString"));
            }
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);

            Room.OnModelCreating(modelBuilder);
            User.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
        {
            AddTimestamps();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override int SaveChanges()
        {

            AddTimestamps();
            return base.SaveChanges();
        }

        public void AddTimestamps()
        {
            ChangeTracker.Entries<CreatedModifiedAt>().Where(e => e.State == EntityState.Added).ToList()
                .ForEach(e =>
                {
                    e.Entity.CreatedAt = DateTime.Now;
                    e.Entity.ModifiedAt = DateTime.Now;
                });
            
            ChangeTracker.Entries<CreatedModifiedAt>().Where(e => e.State == EntityState.Modified).ToList()
                .ForEach(e =>
                {
                    e.Entity.ModifiedAt = DateTime.Now;
                });

        }
    }
}