using Microsoft.EntityFrameworkCore;
using Messenger_Enter_Text.Entities;

namespace Messenger_Enter_Text.Database
{
  public class Context : DbContext
  {
    public Context(DbContextOptions<Context> options) : base(options)
    {
      
    }
    public DbSet<User> Users { get; set; }
    public DbSet<UserProfile> Profiles { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Complaint> Complaints { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);

      modelBuilder.Entity<User>()
        .HasKey(u => u.Id);

      modelBuilder.Entity<User>()
        .HasOne(u => u.UserProfile)
        .WithOne(p => p.User)
        .HasForeignKey<UserProfile>(p => p.UId);

      modelBuilder.Entity<User>()
        .HasMany(u => u.Friends)
        .WithMany();

      modelBuilder.Entity<User>()
        .HasMany(u => u.Chats)
        .WithMany(c => c.Users);

      modelBuilder.Entity<User>()
        .HasMany(u => u.Messages)
        .WithOne(m => m.User)
        .HasForeignKey(m => m.SenderId);

      modelBuilder.Entity<User>()
        .HasMany(u => u.BlackList)
        .WithMany();

      modelBuilder.Entity<User>()
        .HasMany(u => u.FriendsPending)
        .WithMany();


      modelBuilder.Entity<Chat>()
        .HasKey(c => c.Id);

      modelBuilder.Entity<Chat>()
        .HasMany(c => c.Messages)
        .WithOne(m => m.Chat)
        .HasForeignKey(m => m.ChatId);


      modelBuilder.Entity<Message>()
        .HasKey(m => m.Id);


      modelBuilder.Entity<UserProfile>()
        .HasKey(p => p.UId);


      modelBuilder.Entity<Complaint>()
        .HasKey(c => c.Id);

      modelBuilder.Entity<Complaint>()
        .HasOne(c => c.Suspect)
        .WithMany(u => u.Complaints)
        .HasForeignKey(c => c.UId)
        .OnDelete(DeleteBehavior.NoAction);

      modelBuilder.Entity<Complaint>()
        .HasOne(c => c.Message)
        .WithMany(m => m.Complaints)
        .HasForeignKey(c => c.MId);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Messenger_DB;Trusted_Connection=True;");
      }
    }

  }
}
