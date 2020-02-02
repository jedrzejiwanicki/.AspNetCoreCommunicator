using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Communicator.Db.Entities
{
    public class User: IdentityUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public override string Id { get; set; }
        
        public UserConnection Connection { get; set; }
        public Room ConnectedRoom { get; set; }
        public string ConnectedRoomId { get; set; }

        public static void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<User>()
                .HasOne(u => u.Connection)
                .WithOne(uc => uc.ConnectedUser)
                .HasForeignKey<UserConnection>(uc => uc.ConnectedUserId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}