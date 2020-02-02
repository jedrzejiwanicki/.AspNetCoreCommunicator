using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Communicator.Db.Entities
{
    public class Room : IRequest<Unit>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        [Required] public string Name { get; set; }

        public List<User> ConnectedUsers { get; set; } = new List<User>();

        public static void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>()
                .HasMany(r => r.ConnectedUsers)
                .WithOne(u => u.ConnectedRoom);

            modelBuilder.Entity<Room>()
                .HasData(new Room {Id = "default", Name = "default"});
        }
    }
}