namespace Messenger_Enter_Text.DTOs
{
  public class UserProfileDto
  {
    public int UId { get; set; }
    public string? Nickname { get; set; }
    public string? About { get; set; }
    public DateOnly? Birthday { get; set; }
    public bool Status { get; set; }
    public DateTime HadBeen { get; set; }
    public string? ImagePath { get; set; }
  }
}
