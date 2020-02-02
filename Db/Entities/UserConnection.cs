using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Communicator.Db.Entities
{
    public class UserConnection
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        [Required] public string ConnectionId { get; set; }
        
        public User ConnectedUser { get; set; }
        public string ConnectedUserId { get; set; }


    }
}