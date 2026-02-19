using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IWebHostEnvironment _env;

        public ProductsController(AppDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        [HttpPost("upload")]
        [Authorize(Roles = "Admin")] 
        public async Task<IActionResult> UploadProduct(
            [FromForm] IFormFile image,
            [FromForm] string name,
            [FromForm] decimal price,
            [FromForm] string description,
            [FromForm] string category,
            [FromForm] int stock)
        {
            if (image == null || image.Length == 0)
                return BadRequest("No image uploaded.");

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var uploadPath = Path.Combine(webRoot, "uploads");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var safeFileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadPath, safeFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            var product = new Product
            {
                Name = name,
                Price = price,
                Description = description,
                Category = category,
                Stock = stock,
                ImageUrl = "/uploads/" + safeFileName
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return Ok(product);
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _db.Products.ToList();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _db.Products.FirstOrDefault(p => p.ProductId == id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpDelete("{id}")]
         [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = _db.Products.FirstOrDefault(p => p.ProductId == id);
            if (product == null)
                return NotFound();

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Product deleted successfully." });
        }

        [Authorize(Roles = "Admin")]
[HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(
    int id,
    [FromForm] IFormFile? image,
    [FromForm] string name,
    [FromForm] decimal price,
    [FromForm] string description,
    [FromForm] string category,
    [FromForm] int stock)
{
    var product = _db.Products.FirstOrDefault(p => p.ProductId == id);
    if (product == null)
        return NotFound();

    product.Name = name;
    product.Price = price;
    product.Description = description;
    product.Category = category;
    product.Stock = stock;

    if (image != null && image.Length > 0)
    {
        var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
        var uploadPath = Path.Combine(webRoot, "uploads");
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var safeFileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
        var filePath = Path.Combine(uploadPath, safeFileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        product.ImageUrl = "/uploads/" + safeFileName;
    }

    await _db.SaveChangesAsync();
    return Ok(product);
}

    }
}
