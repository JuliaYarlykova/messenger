namespace Messenger_Enter_Text.Repository
{
  public interface IRepo<T>
  {
    Task<IEnumerable<T>> GetAll();
    Task<T?> GetById(int id);
  }
}
