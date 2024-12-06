using Messenger_Enter_Text.Database;
using Messenger_Enter_Text.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NgrokAspNetCore;
using System.Net;
using System.Net.WebSockets;
using System.Text;

public class AuthOptions
{
  public const string ISSUER = "MyIssuer";
  public const string AUDIENCE = "MyAudience";
  public const int LIFETIME = 60;
  private const string KEY = "this is my custom Secret key for authentication aaaaaaa";

  public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}

internal class Program
{
  private static void Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);


    builder.Services.AddCors(options =>
    {
      options.AddPolicy("AllowAllHeaders",
        builder =>
        {
          builder
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
        });
    });


    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = AuthOptions.ISSUER,
            ValidAudience = AuthOptions.AUDIENCE,
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey()
          };
        });

    builder.Services.AddControllers();

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddDbContext<Context>(options =>
      options
      .UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
      );
    builder.Services.AddAutoMapper(typeof(MappingProfile));

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    //app.UseHttpsRedirection();
    app.UseWebSockets();

    app.UseCors("AllowAllHeaders");

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
  }
}