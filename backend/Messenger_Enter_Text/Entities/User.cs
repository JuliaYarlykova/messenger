using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Messenger_Enter_Text.Entities
{
  [Table("Users")]
  [Index(nameof(UserEmail), IsUnique = true)]
  public class User
  {
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string UserEmail { get; set; } = "Example@example.com";

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public bool IsEmailConfirmed { get; set; }

    [Required]
    [StringLength(2000)]
    public string Config { get; set; } = "<InterfaceConfig></InterfaceConfig>";

    [Required]
    public bool IsFrozen { get; set; } = false;

    [JsonIgnore]
    public List<Chat> Chats { get; set; }
    [JsonIgnore]
    public List<Message> Messages { get; set; }
    [JsonIgnore]
    public List<User> Friends { get; set; }
    [JsonIgnore]
    public List<User> FriendsPending { get; set; }
    [JsonIgnore]
    public UserProfile UserProfile { get; set; }
    [JsonIgnore]
    public List<User> BlackList { get; set; }
    [JsonIgnore]
    public List<Complaint> Complaints { get; set; }
  }
}
