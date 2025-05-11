using Microsoft.AspNetCore.Mvc;
using ShoeShopAPI.Data;
using ShoeShopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ShoeShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(CartItem item)
        {
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == item.UserId && c.ProductID == item.ProductID);

            if (existing != null)
            {
                existing.Quantity += item.Quantity;
            }
            else
            {
                _context.CartItems.Add(item);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart(int userId)
        {
            return await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveItem(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
