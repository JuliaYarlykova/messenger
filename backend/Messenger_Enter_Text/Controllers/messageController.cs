using AutoMapper;
using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.Entities;
using Messenger_Enter_Text.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static System.Net.Mime.MediaTypeNames;

namespace Messenger_Enter_Text.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class messageController : ControllerBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public messageController(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetMessage(long id)
    {
      var m = await new MessageRep(_context, _mapper).GetById_l(id);
      return new JsonResult(m);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> SendMessage(int chatId, string text)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var u = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (u != null)
      {
        return NotFound("User does not exist");
      }
      Message m = new Message()
      {
        Text = text,
        ChatId = chatId,
        SenderId = 2,
        Time = DateTime.UtcNow
      };
      await _context.Messages.AddAsync(m);
      await _context.SaveChangesAsync();
      return Ok("Message was sent");
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult> EditMessage(long id, string text)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var u = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (u != null)
      {
        return NotFound("User does not exist");
      }
      var message = await _context.Messages.Include(m => m.User).Where(m => m.Id == id).FirstOrDefaultAsync();
      if (message != null)
      {
        return BadRequest(message);
      }
      else if (message.User.Id != u.Id)
      {
        return Conflict("User does not own this message");
      }
      message.Text = text;
      await _context.SaveChangesAsync();
      return Ok();
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult> DeleteMessage(long id)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var u = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (u != null)
      {
        return NotFound("User does not exist");
      }
      var message = await _context.Messages.Include(m => m.User).Where(m => m.Id == id).FirstOrDefaultAsync();
      if (message != null)
      {
        return BadRequest(message);
      }
      else if (message.User.Id != u.Id)
      {
        return Conflict("User does not own this message");
      }
      _context.Messages.Remove(message);
      _context.SaveChanges();
      return Ok();
    }
  }
}
