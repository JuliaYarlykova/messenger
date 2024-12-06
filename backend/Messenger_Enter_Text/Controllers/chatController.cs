using AutoMapper;
using Messenger_Enter_Text.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Messenger_Enter_Text.Controllers
{
  [Route("/api/[controller]")]
  public class chatController : ControllerBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;
    public chatController(Context context, IMapper mapper) {
      _context = context;
      _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult> Create(string desc, string name)
    {
      _context.Chats.Add(new Entities.Chat
      {
        Description = desc,
        Is_Private = true,
        Name = name
      });

      await _context.SaveChangesAsync();
      return Ok();
    }
  }
}
