using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApi.Data;
using MyApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// =======================
// DATABASE CONNECTION
// =======================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// =======================
// JWT AUTHENTICATION SETUP
// =======================
var jwtKey = builder.Configuration["Jwt:Key"] ?? "your_secret_key_123456"; // fallback
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "https://localhost";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "https://localhost";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

// =======================
// AUTHORIZATION + CONTROLLERS
// =======================
builder.Services.AddAuthorization();
builder.Services.AddControllers();

// =======================
// CORS
// =======================
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// =======================
// DATABASE SEED (ADMIN USER)
// =======================
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Users.Any(u => u.Username == "admin"))
    {
        db.Users.Add(new User { Username = "admin", Password = "1234", Role = "Admin" });
        db.SaveChanges();
    }
}

// =======================
// MIDDLEWARE PIPELINE
// =======================
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();

// ✅ These must come BEFORE app.MapControllers()
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
