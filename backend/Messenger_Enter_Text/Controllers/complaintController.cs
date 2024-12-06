using AutoMapper;
using Messenger_Enter_Text.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Messenger_Enter_Text.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class complaintController : ControllerBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public complaintController(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    //[HttpGet]
    //public async Task<IActionResult> GetComp(int id) 
    //{
      
    //}

    //[HttpGet("all")]
    //public async Task<IActionResult> GetComps()
    //{

    //}

    //[HttpPost]
    //public async Task<IActionResult> CreateComp(int uId, string text, int? mId) 
    //{ 
      
    //}

    //[HttpDelete]
    //public async Task<IActionResult> DeleteComp(int id)
    //{

    //}

  }
}
