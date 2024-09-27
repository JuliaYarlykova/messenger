namespace Messenger_Enter_Text.DTOs
{
  public class UserDto
  {
    public int Id { get; set; }
    public string UserEmail { get; set; }
    public bool IsEmailConfirmed { get; set; }
    public bool IsFrozen { get; set; }
  }
}
