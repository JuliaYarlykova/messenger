using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger_Enter_Text.Entities
{
  [Table("Complaints")]
  public class Complaint
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public int UId { get; set; }
    public long MId { get; set; }
    [Required]
    [StringLength(200)]
    public string Text { get; set; }
    public Message? Message { get; set; }
    public User Suspect { get; set; }

  }
}
