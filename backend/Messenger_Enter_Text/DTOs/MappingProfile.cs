using AutoMapper;
using Messenger_Enter_Text.Entities;

namespace Messenger_Enter_Text.DTOs
{
  public class MappingProfile : Profile
  {
    public MappingProfile() {
      CreateMap<User, UserDto>();
      CreateMap<UserProfile, UserProfileDto>();
      CreateMap<Message, MessageDto>();
      CreateMap<Chat, ChatDto>();
      CreateMap<Complaint, ComplaintDto>();
    }
  }
}
