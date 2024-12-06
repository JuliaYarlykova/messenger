using AutoMapper;
using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.DTOs;
using Messenger_Enter_Text.Entities;
using Messenger_Enter_Text.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Messenger_Enter_Text.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class userController : ControllerBase
  {

    private readonly Context _context;
    private readonly IMapper _mapper;

    public userController(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] string? nickname = null, [FromQuery] int? id = null)
    {
      if (id.HasValue)
      {
        var user = await new UserRep(_context, _mapper).GetById(id.Value);
        if (user == null)
        {
          return NotFound();
        }
        return new JsonResult(user);
      }
      else if (!string.IsNullOrEmpty(nickname))
      {
        var users = await new UserRep(_context, _mapper).SearchByNickname(nickname);
        return new JsonResult(users);
      }
      else
      {
        var allUsers = await new UserRep(_context, _mapper).GetAll();
        return new JsonResult(allUsers);
      }
    }

    record Tk
    {
      public string token {  get; set; }
    }

    [HttpPost("login")]
    public async Task<ActionResult> SignIn(string email, string password)
    {
      UserRep userRep = new UserRep(_context, _mapper);
      string token;
      try
      {
        token = await userRep.UserVerification(email, password);
      }
      catch (ArgumentNullException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (NullReferenceException ex) {
        return NotFound(ex.Message);
      }
      catch (MethodAccessException ex)
      {
        return Unauthorized(ex.Message);
      }

      Tk tk = new Tk();
      tk.token = token;

      var user = await userRep.GetByEmail(email);
      return user.IsFrozen ? Forbid("Account is frozen") : new JsonResult(tk);
    }

    [HttpPost]
    public async Task<ActionResult> SignUp(string nickname, string email, string password, bool isEmailConfirmed, DateOnly birthday)
    {
      if (await new UserRep(_context, _mapper).GetByNickname(nickname) != null)
      {
        return Conflict("nickname");
      }
      if (await new UserRep(_context, _mapper).GetByEmail(email) != null)
      {
        return Conflict("email");
      }
      var user = new User();
      user.UserEmail = email;
      user.Password = PasswordHasher.HashPassword(password);
      user.IsEmailConfirmed = isEmailConfirmed;

      user.UserProfile = new UserProfile();
      user.UserProfile.Status = true;
      user.UserProfile.HadBeen = DateTime.Now;
      user.UserProfile.Birthday = birthday;
      user.UserProfile.User = user;
      user.UserProfile.Nickname = nickname.Trim();
      user.UserProfile.About = "Hey, I'm here";
      user.UserProfile.ImagePath = "ProfileImages/avatar.png";

      new UserRep(_context, _mapper).Add(user);
      await _context.SaveChangesAsync();
      return await SignIn(email, password);
    }

    [Authorize]
    [HttpPut("password")]
    public async Task<ActionResult> ChangePassword(int id, string oldPassword, string newPassword)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;

      var user = await new UserRep(_context, _mapper).GetById(id);
      if (user != null && emailClaim != user.UserEmail && roleClaim != "Admin")
      {
        return Forbid("An attempt to delete inaccessible user detected");
      }
      bool success = await new UserRep(_context, _mapper).ChangePassword(id, oldPassword, newPassword);
      return success ? Ok() : Unauthorized("Old password does not match with the current one or user was not found");
    }

    [Authorize]
    [HttpPut("freeze")]
    public async Task<ActionResult> Freeze(int id)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;

      var user = await new UserRep(_context, _mapper).GetById(id);
      if (user != null && emailClaim != user.UserEmail && roleClaim != "Admin")
      {
        return Forbid("An attempt to delete inaccessible user detected");
      }
      bool success = await new UserRep(_context, _mapper).Freeze(id);
      return success ? Ok() : NotFound($"User {id} was not found");
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult> DeleteUser([FromBody] UserDto? user = null, [FromQuery] int? id = null)
    {
      var emailClaim = User.FindFirst(ClaimTypes.Email)?.Value;
      var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
      
      bool success;
      if (user != null)
      {
        if (emailClaim != user.UserEmail && roleClaim != "Admin")
        {
          return Forbid("An attempt to delete inaccessible user detected");
        }
        success = await new UserRep(_context, _mapper).DeleteById(user.Id);
      }
      else if (id.HasValue)
      {
        user = await new UserRep(_context, _mapper).GetById(id.Value);
        if (user != null && emailClaim != user.UserEmail && roleClaim != "Admin")
        {
          return Forbid("An attempt to delete inaccessible user detected");
        }
        success = await new UserRep(_context, _mapper).DeleteById(id.Value);
      }
      else
      {
        return BadRequest();
      }
      return success ? Ok() : NotFound($"User {id} was not found");
    }
  }
}
