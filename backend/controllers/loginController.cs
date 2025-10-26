using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyApi.Data;
using MyApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ==========================
        //  LOGIN
        // ==========================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

            if (user == null || user.Password != login.Password)
                return Unauthorized(new { message = "Invalid username or password." });

            // Create JWT token
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Login successful",
                token,
                role = user.Role
            });
        }

        // ==========================
        //  SIGNUP
        // ==========================
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] SignupModel newUser)
        {
            if (_context.Users.Any(u => u.Username == newUser.Username))
                return Conflict(new { message = "Username already exists." });

            var user = new User
            {
                Username = newUser.Username,
                Password = newUser.Password,
                Role = string.IsNullOrEmpty(newUser.Role) ? "User" : newUser.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User created successfully." });
        }

        // ==========================
        //  HELPER: JWT CREATION
        // ==========================
        private string GenerateJwtToken(User user)
        {
            var key = _config["Jwt:Key"] ?? "your_secret_key_123456";
            var issuer = _config["Jwt:Issuer"] ?? "https://localhost";
            var audience = _config["Jwt:Audience"] ?? "https://localhost";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // ==========================
        //  MODELS
        // ==========================
        public class LoginModel
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class SignupModel
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string? Role { get; set; }
        }
    }
}
