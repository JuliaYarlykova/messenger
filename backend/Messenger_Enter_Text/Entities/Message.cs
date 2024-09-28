using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger_Enter_Text.Entities
{
  [Table("Messages")]
  public class Message
  {
    [Key]
    public long Id { get; set; }

    [Required]
    public int SenderId { get; set; } = -1;

    [Required]
    public int ChatId { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    public DateTime Time { get; set; }

    public User? User { get; set; }

    public Chat Chat { get; set; }
          
    public List<Complaint> Complaints { get; set; }
  }
}
