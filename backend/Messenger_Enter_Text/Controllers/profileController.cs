using AutoMapper;
using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Messenger_Enter_Text.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class profileController : ControllerBase
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public profileController(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetProf(int id)
    {
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {
        return NotFound();
      }
      prof.ImagePath = Path.GetFileName(prof.ImagePath);
      return new JsonResult(prof);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> EditProfile(
      int id,
      string? nick, 
      string? about,
      DateOnly? birthday)
    {
      var prof = await new ProfileRep(_context, _mapper).GetUPById(id);
      
      if (prof == null)
      {
        return NotFound();
      }

      prof.About = about != null ? about : prof.About;
      prof.Birthday = birthday != null ? birthday : prof.Birthday;
      prof.Nickname = nick != null ? nick : prof.Nickname;

      new ProfileRep(_context, _mapper).Update(prof);
      await _context.SaveChangesAsync();

      return Ok(prof);
    }

    [Authorize]
    [HttpPut("status")]
    public async Task<ActionResult> ChangeStatus(bool isOnline)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var usr = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (usr != null)
      {
        return NotFound();
      }
      bool success = await new ProfileRep(_context, _mapper).ChangeStatus(usr.Id, isOnline);
      return success ? Ok() : NotFound();
    }

    [HttpGet("status/{id}")]
    public async Task<ActionResult> GetStatus(int id) 
    {
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {
        return NotFound();
      }
      return Ok(prof.Status); 
    }

    [Authorize]
    [HttpPut("nickname")]
    public async Task<ActionResult> ChangeNickname(string newNick)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var usr = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (usr != null)
      {
        return NotFound();
      }
      bool success = await new ProfileRep(_context, _mapper).ChangeNickname(usr.Id, newNick);
      return success ? Ok() : NotFound();
    }

    [Authorize]
    [HttpPut("about")]
    public async Task<ActionResult> ChangeDescription(string newDesc)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var usr = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (usr != null)
      {
        return NotFound();
      }
      bool success = await new ProfileRep(_context, _mapper).ChangeDesc(usr.Id, newDesc);
      return success ? Ok() : NotFound();
    }

    [HttpGet("about")]
    public async Task<ActionResult> GetDescription(int id)
    {
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {
        return NotFound();
      }
      return Ok(prof.About);
    }

    [HttpGet("birthday")]
    public async Task<ActionResult> GetBirthday(int id)
    {
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {
        return NotFound();
      }
      return Ok(prof.Birthday);
    }

    [HttpGet("last")]
    public async Task<ActionResult> GetLastTime(int id)
    {
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {
        return NotFound();
      }
      return Ok(prof.HadBeen);
    }

    [Authorize]
    [HttpPut("last")]
    public async Task<ActionResult> SetLastTime(DateTime dateTime)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var usr = await new UserRep(_context, _mapper).GetByEmail(emailClaim);
      if (usr != null)
      {
        return NotFound();
      }
      bool success = await new ProfileRep(_context, _mapper).SetLastTime(usr.Id, dateTime);
      return success ? Ok() : NotFound();
    }

    [HttpGet("image-and-nickname")]
    public async Task<ActionResult> GetImageAndNick(int id)
    {
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {  return NotFound(); }
      
      List<string> values = new List<string> {prof.Nickname,
        prof.ImagePath != null ?
        $"api/profile/image/{Path.GetFileName(prof.ImagePath)}":
        "api/profile/image/avatar.png"};
      return new JsonResult(values);
    }

    [HttpGet("image/{imageName}")]
    public IActionResult GetImage(string imageName)
    {
      var imagePath = Path.Combine("ProfileImages", imageName);
      if (!System.IO.File.Exists(imagePath))
      {
        return NotFound();
      }
      var imageFileStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read);
      return File(imageFileStream, "image/jpeg");
    }

    [HttpDelete("delete-profile-image")]
    public async Task<ActionResult> DeleteImage(int id)
    {
      bool success = await new ProfileRep(_context, _mapper).BindImage(id, "ProfileImages/avatar.png");
      return success ? Ok() : NotFound("Profile does not exist");
    }

    [HttpPost("upload-profile-image")]
    public async Task<IActionResult> UploadImage(int id, IFormFile file)
    {
      if (file == null || file.Length == 0)
      {
        return BadRequest("No file uploaded.");
      }

      var filePath = Path.Combine("ProfileImages", file.FileName);

      if (!Directory.Exists("ProfileImages"))
      {
        Directory.CreateDirectory("ProfileImages");
      }

      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(stream);
      }
      var prof = await new ProfileRep(_context, _mapper).GetById(id);
      if (prof == null)
      {
        return NotFound();
      }

      bool success = await new ProfileRep(_context, _mapper).BindImage(id, filePath);

      return success ? Ok(new { FilePath = filePath }) : NotFound("User does not exist");
    }

    [HttpPut("edit-profile-image")]
    public async Task<IActionResult> EditImage(int id, IFormFile file)
    {
      return await UploadImage(id, file);
    }
  }
}
