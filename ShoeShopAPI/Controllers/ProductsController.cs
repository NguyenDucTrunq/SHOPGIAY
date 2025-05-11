using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoeShopAPI.Data;
using ShoeShopAPI.Models;

namespace ShoeShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProductsController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.OrderByDescending(p => p.CreatedAt).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] Product product, IFormFile? image)
        {
            if (image != null)
            {
                string uploadsFolder = Path.Combine(_environment.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = $"{Guid.NewGuid()}_{image.FileName}";
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                product.ImageURL = $"/uploads/{uniqueFileName}";
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductID }, product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] Product updated, IFormFile? image)
        {
            var existing = await _context.Products.FindAsync(id);
            if (existing == null) return NotFound();

            // Copy values
            existing.ProductName = updated.ProductName;
            existing.Description = updated.Description;
            existing.Price = updated.Price;
            existing.Quantity = updated.Quantity;
            existing.Brand = updated.Brand;
            existing.Category = updated.Category;
            existing.Size = updated.Size;

            // New image
            if (image != null)
            {
                if (!string.IsNullOrEmpty(existing.ImageURL))
                {
                    string oldPath = Path.Combine(_environment.WebRootPath ?? "wwwroot", existing.ImageURL.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath)) System.IO.File.Delete(oldPath);
                }

                string uploadsFolder = Path.Combine(_environment.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = $"{Guid.NewGuid()}_{image.FileName}";
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                existing.ImageURL = $"/uploads/{uniqueFileName}";
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.ImageURL))
            {
                var imgPath = Path.Combine(_environment.WebRootPath ?? "wwwroot", product.ImageURL.TrimStart('/'));
                if (System.IO.File.Exists(imgPath)) System.IO.File.Delete(imgPath);
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
