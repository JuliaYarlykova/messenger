using Messenger_Enter_Text.Database;
using Microsoft.EntityFrameworkCore;
using Messenger_Enter_Text.Entities;
using AutoMapper;
using Messenger_Enter_Text.DTOs;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Messenger_Enter_Text.Repository
{
  public class UserRep : IRepo<UserDto>
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public UserRep(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }
    public void Add(User item) => 
      _context.Users.Add(item);

    public async Task<bool> DeleteById(int id) {
      var user = await _context.Users.FindAsync(id);
      if (user != null)
      {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
      }
      else
      {
        return false;
      }
    }

    public void Delete(User user) => 
      _context.Users.Remove(user);

    public async Task<IEnumerable<UserDto>> GetAll() => 
      _mapper.Map<List<UserDto>>(await _context.Users.ToListAsync());

    public async Task<UserDto?> GetById(int id)
    {
      var user = await _context.Users.FindAsync(id);

      if (user == null) 
      {
        return null;
      }

      return _mapper.Map<UserDto>(user);
    }
    public void Update(User item) => 
      _context.Entry(item).State = EntityState.Modified;

    public async Task<UserDto?> GetByEmail(string email)
    {
      var user = await _context.Users
        .Where(u => u.UserEmail.ToLower() == email.ToLower())
        .FirstOrDefaultAsync();

      if (user == default(User)) 
      {
        return null;
      }

      return _mapper.Map<UserDto>(user);
    }

    public async Task<List<UserDto>> SearchByNickname(string str) {
      
      List<User> users = await _context.Users
      .Include(u => u.UserProfile)
      .Where(u => u.UserProfile.Nickname.ToLower().StartsWith(str.ToLower().Trim()))
      .ToListAsync();

      if(users.Count == 0)
      {
        users = await _context.Users
        .Include(u => u.UserProfile)
        .Where(u => u.UserProfile.Nickname.ToLower().Contains(str.ToLower().Trim()))
        .ToListAsync();
      }
      
      return _mapper.Map<List<UserDto>>(users);
    }

    public async Task<UserDto?> GetByNickname(string nickname)
    {
      var user = await _context.Users
        .Include(u => u.UserProfile)
        .Where(u => u.UserProfile.Nickname.ToLower().Trim() == nickname.ToLower().Trim())
        .FirstOrDefaultAsync();

      if (user == default(User))
      {
        return null;
      }

      return _mapper.Map<UserDto>(user);
    }
    public async Task<List<UserDto>> GetFriends(User user)
    {
      List<User> users = await _context.Users
        .Include(u => u.Friends)
        .ToListAsync();
      return _mapper.Map<List<UserDto>>(users);
    }
    public async Task<List<UserDto>> GetFriendsPending(User user)
    {
      List<User> users = await _context.Users 
        .Include(u => u.FriendsPending)
        .ToListAsync();
      return _mapper.Map<List<UserDto>>(users);
    }

    public async Task<bool> ChangePassword(int id, string oldPassword, string newPassword)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return false;
      }
      if (PasswordHasher.VerifyPassword(newPassword, user.Password) &&
          PasswordHasher.VerifyPassword(oldPassword, user.Password))
      {
        return true;
      }
      if(PasswordHasher.VerifyPassword(oldPassword, user.Password))
      {
        user.Password = newPassword;
        Update(user);
        await _context.SaveChangesAsync();
        return true;
      }
      
      return false;
    }

    public async Task<bool> Freeze(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return false;
      }
      user.IsFrozen = true;
      Update(user);
      await _context.SaveChangesAsync();
      return true;
    }

    public async Task<string> UserVerification(string email, string password)
    {
      if (email.IsNullOrEmpty())
      {
        throw new ArgumentNullException("email");
      }
      if (password.IsNullOrEmpty())
      {
        throw new ArgumentNullException("password");
      }

      var user = await _context.Users.Where(u => u.UserEmail == email).FirstOrDefaultAsync();

      if (user == default(User))
      {
        throw new NullReferenceException("User was not found");
      }

      if(!PasswordHasher.VerifyPassword(password, user.Password))
      {
        throw new MethodAccessException("Password is incorrect");
      }

      var claims = new[]
      {
        new Claim(ClaimTypes.Email, email),
        new Claim(ClaimTypes.Role, "User")
      };

      var jwt = new JwtSecurityToken(
          issuer: AuthOptions.ISSUER,
          audience: AuthOptions.AUDIENCE,
          claims: claims,
          expires: DateTime.UtcNow.AddMinutes(AuthOptions.LIFETIME),
          signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
          );

      return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
  }
}
