using Microsoft.AspNetCore.Mvc;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
public IActionResult Login([FromBody] LoginModel login)
{
    var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

    if (user == null || user.Password != login.Password)
        return Unauthorized(new { message = "Invalid credentials" });

    // Include role in response
    return Ok(new
    {
        message = "Login successful",
        role = user.Role
    });
}


    [HttpPost("signup")]
public IActionResult Signup([FromBody] SignupModel newUser)
{
    if (_context.Users.Any(u => u.Username == newUser.Username))
        return Conflict(new { message = "Username already exists" });

    var user = new User
    {
        Username = newUser.Username,
        Password = newUser.Password,
        Role = newUser.Role ?? "User" // default
    };

    _context.Users.Add(user);
    _context.SaveChanges();

    return Ok(new { message = "User created successfully" });
}

// Model for signup including optional Role
public class SignupModel
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? Role { get; set; }
}

}

public class LoginModel
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
