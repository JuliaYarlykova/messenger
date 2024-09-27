namespace Messenger_Enter_Text.DTOs
{
  public class MessageDto
  {
    public long Id { get; set; }
    public int SenderId { get; set; }
    public int ChatId { get; set; }
    public string Text { get; set; }
    public DateTime Time { get; set; }
  }
}
