using Messenger_Enter_Text.Entities;
using WebSocketSharp;
using WebSocketSharp.Server;
using System.Text.Json;
using Messenger_Enter_Text.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


internal class Program
{
  public static DbContextOptions<Context> GetOptions()
  {
    var optionsBuilder = new DbContextOptionsBuilder<Context>();
    optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Messenger_DB;Trusted_Connection=True;");

    return optionsBuilder.Options;
  }

  public class ChatListDTO
  {
    public List<int> ChatIds {  get; set; } 
    public List<User> Users { get; set; }
  }

  public class ChatList : WebSocketBehavior
  {
    protected override void OnError(WebSocketSharp.ErrorEventArgs e)
    {
      base.OnError(e);
      Send("Some error occurred: " + e.Message);
    }
    protected override void OnOpen()
    {
      base.OnOpen();
      Send("Successfully connected to ChatList");
    }
    protected override async void OnMessage(MessageEventArgs e)
    {
      using (var context = new Context(GetOptions()))
      {
        int id = 0;
        if (e.Data.IsNullOrEmpty()) {
          Send("Data is empty");
          return;
        }
        try
        {
          id = int.Parse(e.Data);
        } catch {
          Send("Wrong message syntax");
          return;
        }
        User user = await context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        if (user == null)
        {
          Send("404, user does not exist");
        }
        while (true)
        {
          ChatListDTO chatListDTO = new ChatListDTO();
          var chats = await context.Chats
            .Include(c => c.Users)
            .Where(c => c.Users.Contains(user))
            .ToListAsync();
          chatListDTO.ChatIds = chats.Select(c => c.Id).ToList();
          var usrs = chats.SelectMany(c => c.Users).ToList();
          chatListDTO.Users = usrs.Where(u => u.Id != id).ToList();
          Send(JsonSerializer.Serialize(chatListDTO));
          await Task.Delay(1000);
        }
      }
    }
  }

  public class MessageList : WebSocketBehavior
  {
    protected override void OnError(WebSocketSharp.ErrorEventArgs e)
    {
      base.OnError(e);
      Send("Some error occurred: " + e.Message);
    }
    protected override void OnOpen()
    {
      base.OnOpen();
      Send("Successfully connected to MessageList");
    }
    protected override async void OnMessage(MessageEventArgs e)
    {
      using (var context = new Context(GetOptions()))
      {
        int id = 0;
        if (string.IsNullOrEmpty(e.Data))
        {
          Send("Data is empty");
          return;
        }
        try
        {
          id = int.Parse(e.Data);
        }
        catch
        {
          Send("Wrong message syntax");
          return;
        }

        Chat chat = await context.Chats.Include(c => c.Users).FirstOrDefaultAsync(c => c.Id == id);
        if (chat == null)
        {
          Send("404, user does not exist");
          return;
        }

        while (true)
        {
          var messages = await context.Messages
              .Include(c => c.Chat)
              .Where(c => c.Chat == chat)
              .ToListAsync();

          Send(JsonSerializer.Serialize(messages));

          await Task.Delay(10000);
        }
      }
    }
  }

  private static void Main(string[] args)
  {

    WebSocketServer server = new WebSocketServer("ws://localhost:1488");

    server.AddWebSocketService<ChatList>("/chat-list");
    server.AddWebSocketService<MessageList>("/message-list");

    server.Start();
    Console.WriteLine("Ws started!");

    Console.ReadKey();

    server.Stop();
  }
}