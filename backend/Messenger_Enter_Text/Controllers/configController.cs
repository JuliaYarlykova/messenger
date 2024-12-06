using AutoMapper;
using Messenger_Enter_Text.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Messenger_Enter_Text.Controllers
{
  [ApiController]
  [Route("api/User/[controller]")]
  public class configController : ControllerBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public configController(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    //[Authorize]
    //[HttpGet]
    //public async Task<ActionResult> GetConfigParam(string parameter) {
      
    //}

    //[Authorize]
    //[HttpPut]
    //public async Task<ActionResult> SetConfigParam(string parameter, string value)
    //{

    //}

    //[Authorize]
    //[HttpDelete]
    //public async Task<ActionResult> SetConfigToDefault()
    //{

    //}
  }
}
