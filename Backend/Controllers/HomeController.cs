using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace YourNamespace
{
    public class LoginController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public LoginController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Authenticate(string username, string password)
        {
            // Sprawdzanie czy pola są niepuste
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Username and password are required");
            }

            // Sprawdzenie czy użytkownik istnieje w bazie danych
            var user = _userService.GetUserByUsername(username);
            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            // Sprawdzenie poprawności hasła
            if (!_userService.VerifyPassword(user, password))
            {
                return Unauthorized("Invalid username or password");
            }

            // Generowanie tokena JWT
            var token = GenerateJwtToken(user);

            // Zwracanie tokena w odpowiedzi
            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            // Pobranie klucza tajnego z konfiguracji
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

            // Konfiguracja tokena JWT
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    // Tutaj możesz dodać dodatkowe informacje o użytkowniku w postaci claimów
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Ustalenie czasu wygaśnięcia tokena (np. 1 godzina)
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            // Generowanie tokena JWT
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Zapisanie tokena jako ciągu znaków
            return tokenHandler.WriteToken(token);
        }
    }
}
