using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Messenger_Enter_Text.Entities
{
  [Table("Profiles")]
  public class UserProfile
  { 
    [Key]
    public int UId { get; set; }

    [StringLength(100)]
    public string? Nickname { get; set; }

    [StringLength(1000)]
    public string? About { get; set; }

    public DateOnly? Birthday { get; set;}

    [StringLength(260)]
    public string? ImagePath { get; set; }
    
    [Required]
    public DateTime HadBeen { get; set; }

    [Required]
    public bool Status { get; set; }

    [JsonIgnore]
    public User User { get; set; }
  }
}
