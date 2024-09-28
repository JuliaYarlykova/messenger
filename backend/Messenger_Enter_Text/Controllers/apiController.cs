using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.Repository;
using Microsoft.AspNetCore.Mvc;
using Messenger_Enter_Text.Entities;
using AutoMapper;
using Messenger_Enter_Text.DTOs;

namespace Messenger_Enter_Text.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class apiController : ControllerBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public apiController(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    [Route("Version")]
    [HttpGet]
    public JsonResult GetApi() => 
      new JsonResult("0.0.1");

    [Route("")]
    [HttpGet]
    public JsonResult GetWelcome() => 
      new JsonResult("You've been successfully connected to EnterText API!");
  }
}
