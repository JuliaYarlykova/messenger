using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger_Enter_Text.Entities
{
  [Table("Chats")]
  public class Chat
  {
    [Key]
    public int Id { get; set; }

    [Required]
    public bool Is_Private { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    public List<Message> Messages { get; set; }

    public List<User> Users { get; set; }
  }
}
