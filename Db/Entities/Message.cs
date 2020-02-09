using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Communicator.Db.Entities
{
    public class Message : CreatedModifiedAt
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        
        [Required]
        public User Author { get; set; }
        
        [Required]
        public string Text { get; set; }
        
        [Required]
        public Room Room { get; set; }
    }
}