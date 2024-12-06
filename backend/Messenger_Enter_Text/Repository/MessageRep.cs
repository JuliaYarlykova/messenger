using AutoMapper;
using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.DTOs;
using Messenger_Enter_Text.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Messenger_Enter_Text.Repository
{
  public class MessageRep : IRepo<MessageDto>
  {
    private readonly Context _context;
    private readonly IMapper _mapper;

    public MessageRep(Context context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<IEnumerable<MessageDto>> GetAll() => 
      _mapper.Map<List<MessageDto>>(await _context.Messages.ToListAsync());

    public async Task<MessageDto?> GetById(int id) =>
      _mapper.Map<MessageDto>(await _context.Messages.FindAsync(id));

    public async Task<MessageDto?> GetById_l(long id) =>
      _mapper.Map<MessageDto>(await _context.Messages.FindAsync(id));

    public async Task<bool> Send(Message message)
    {
      await _context.Messages.AddAsync(message);
      return await _context.SaveChangesAsync() > 0;
    }

    public async Task<List<MessageDto>> GetByChat(int chatId)
    {
      var chat = await _context.Chats
        .Include(m => m.Messages)
        .Where(c => c.Id == chatId)
        .FirstOrDefaultAsync();
      return _mapper.Map<List<MessageDto>>(chat.Messages);
    }
  }
}
