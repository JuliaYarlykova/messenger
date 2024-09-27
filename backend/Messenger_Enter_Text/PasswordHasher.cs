using System.Collections;
using System.Security.Cryptography;

namespace Messenger_Enter_Text
{
  public class PasswordHasher
  {
    public static string HashPassword(string password)
    {
      using (var hmac = new HMACSHA256())
      {
        byte[] salt = hmac.Key;

        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000))
        {
          byte[] hash = pbkdf2.GetBytes(32);
          return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
        }
      }
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
      var parts = hashedPassword.Split(':');
      byte[] salt = Convert.FromBase64String(parts[0]);
      byte[] hash = Convert.FromBase64String(parts[1]);

      using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000))
      {
        byte[] newHash = pbkdf2.GetBytes(32);
        return new HashEqualityComparer().Equals(hash, newHash);
      }
    }
  }

  public class HashEqualityComparer : System.Collections.IEqualityComparer
  {
    public new bool Equals(object x, object y)
    {
      if (x is byte[] xBytes && y is byte[] yBytes)
      {
        return StructuralComparisons.StructuralEqualityComparer.Equals(xBytes, yBytes);
      }
      return false;
    }

    public int GetHashCode(object obj)
    {
      return obj.GetHashCode();
    }
  }
}
