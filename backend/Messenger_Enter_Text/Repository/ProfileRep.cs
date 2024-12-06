using AutoMapper;
using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.DTOs;
using Messenger_Enter_Text.Entities;
using Microsoft.EntityFrameworkCore;

namespace Messenger_Enter_Text.Repository
{
  public class ProfileRep : IRepo<UserProfileDto>
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public ProfileRep(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<IEnumerable<UserProfileDto>> GetAll() => 
      _mapper.Map<List<UserProfileDto>>(await _context.Profiles.ToListAsync());

    public async Task<UserProfileDto?> GetById(int id)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();

      if (prof != default(UserProfile))
      {
        return _mapper.Map<UserProfileDto>(prof);
      }
      else
      {
        return null;
      }
    }

    public async Task<UserProfile?> GetUPById(int id)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();

      if (prof != default(UserProfile))
      {
        return prof;
      }
      else
      {
        return null;
      }
    }
    public void Update(UserProfile userProfile) =>
      _context.Entry(userProfile).State = EntityState.Modified;

    public async Task<bool> BindImage(int id, string path)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();
      if (prof == default(UserProfile))
      {
        return false;
      }
      prof.ImagePath = path;
      await _context.SaveChangesAsync();
      return true;
    }

    public async Task<bool> ChangeStatus(int id, bool isOnline)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();
      if (prof != default(UserProfile))
      {
        return false;
      }
      prof.Status = isOnline;
      Update(prof);
      await _context.SaveChangesAsync();
      return true;
    }

    public async Task<bool> ChangeNickname(int id, string newNick)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();
      if (prof != default(UserProfile))
      {
        return false;
      }
      prof.Nickname = newNick;
      Update(prof);
      await _context.SaveChangesAsync();
      return true;
    }
    public async Task<bool> ChangeDesc(int id, string newDesk)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();
      if (prof != default(UserProfile))
      {
        return false;
      }
      prof.About = newDesk;
      Update(prof);
      await _context.SaveChangesAsync();
      return true;
    }

    public async Task<bool> SetLastTime(int id, DateTime dateTime)
    {
      var prof = await _context.Profiles.Where(p => p.UId == id).FirstOrDefaultAsync();
      if (prof != default(UserProfile))
      {
        return false;
      }
      prof.HadBeen = dateTime;
      Update(prof);
      await _context.SaveChangesAsync();
      return true;
    }


  }
}
